'use client';

import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { BellRing, ShoppingCart, Slash } from 'lucide-react';
import { ProductComplect, ProductItem } from '@prisma/client';
import { TabsProduct } from './tabs-product';
import { SizesTableModal } from './modals';
import CarouselProductImg from './carousel-product-img';
import { ComplectProductForm } from './complect-product-form';
import Link from 'next/link';
import { Category } from './product-form';
import { Tooltip } from 'react-tooltip';

interface Props {
    id: number;
    imageUrl: string[];
    name: string;
    price: number;
    discountPrice?: number | null;
    stickers?: string[];
    loading?: boolean;
    className?: string;
    onSubmit?: (id: number | undefined) => void;
    description?: string | null;
    items: ProductItem[];
    complects?: ProductComplect[] | any;
    category?: Category | null;
}

type BreadcrumbsProps = {
    categoryUrl?: string | null;
    categoryName?: string | null;
    productName: string;
}

const Breadcrumbs = ({ categoryUrl, categoryName, productName }: BreadcrumbsProps) => {
    return (
        <div className="flex items-center text-xs md:text-sm lg:text-sm mb-3 text-gray-400">
            <Link href="/" className="hover:underline text-center">Головна</Link>
            <Slash size={14} className="mx-1 ml:mx-2" />
            <Link href="/catalog" className="hover:underline text-center">Каталог</Link>
            <Slash size={14} className="mx-1 ml:mx-2" />
            {categoryUrl && categoryName ? (
                <>
                    <Link href={`/catalog/${categoryUrl}`} className="hover:underline text-center">{categoryName}</Link>
                    <Slash size={14} className="mx-1 ml:mx-2" />
                </>
            ) : null}
            <span className='text-center'>{productName}</span>
        </div>
    );
};


export const ChooseProductForm: React.FC<Props> = ({
    id,
    name,
    imageUrl,
    price,
    onSubmit,
    className,
    loading,
    description,
    items,
    discountPrice,
    stickers,
    complects,
    category,
}) => {
    const [openSizeModal, setOpenSizeModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const sizes = items.map((item) => [item.size, item.stock]);
    const hasInStock = selectedSize
        ? !!items.find((item) => item.size === selectedSize)?.stock
        : items.some((item) => item.stock);
    const sku = items.find((item) => item.size === selectedSize)?.sku;

    return (
        <div className={cn(className, 'flex flex-col ml:flex-row gap-4 md:gap-14 mb-[10px] md:mb-[130px]')}>
            <div className="block ml:hidden mx-auto">
                <Breadcrumbs
                    categoryUrl={category?.categoryUrl}
                    categoryName={category?.name}
                    productName={name}
                />
            </div>
            <div className="flex mx-auto relative">
                {imageUrl.length <= 1 ? (
                    <img src={imageUrl[0]} alt={name} className="rounded-sm w-full h-auto object-contain" />
                ) : (
                    <CarouselProductImg productName={name} items={imageUrl} stickers={stickers} />
                )}
            </div>
            <div className="flex flex-col w-full px-0 py-4">
                <div className='hidden ml:block'>
                    <Breadcrumbs
                        categoryUrl={category?.categoryUrl}
                        categoryName={category?.name}
                        productName={name}
                    />
                </div>
                <div className="flex justify-between">
                    <Title text={name} className="text-xl sm:text-3xl font-extrabold mb-1" />
                    {selectedSize && (
                        <div className="hidden sm:block h-[50px] bg-neutral-200 rounded-sm">
                            <b className="text-sm  p-3">Артикул:</b>
                            <p className="text-[10px] lg:text-sm px-3">{sku}</p>
                        </div>
                    )}
                </div>
                {selectedSize && (
                        <div className="block sm:hidden my-3">
                            <p className="text-sm"><span className='font-bold'>Артикул:</span> {sku}</p>
                        </div>
                )}
                {hasInStock ? (
                    <p className="text-green-600 text-sm">В наявності</p>
                ) : (
                    <p className="text-red-600 text-sm">Немає в наявності</p>
                )}
                <b className="mt-3 text-3xl mb-5">
                    {discountPrice ? (
                        <>
                            <span>{price}₴</span>
                            <span className="ml-3 text-gray-400 line-through text-[21px]">{discountPrice}₴</span>
                        </>
                    ) : (
                        <span>{price}₴</span>
                    )}
                </b>
                <hr />
                <div className="mt-5">
                    <p className="text-lg font-bold">Розміри</p>
                    <div className="flex gap-3 items-center flex-wrap">
                        {sizes.map((size, i) => (
                            <Button
                                key={i}
                                onClick={() => setSelectedSize(size[0] as string)}
                                variant={selectedSize === size[0] ? 'default' : 'outline'}
                                className={`h-[40px] px-5 text-base w-[40px] mt-4 ${size[1] === false && 'border-gray-300 text-gray-400'} ${size[0] === selectedSize && 'text-white'}`}
                            >
                                {size}
                            </Button>
                        ))}
                        <Button onClick={() => setOpenSizeModal(true)} variant="link" className="mt-4">
                            Розмірна таблиця
                        </Button>
                    </div>
                </div>
                {hasInStock ? (
                    <>
                        <div className={`relative h-[55px] w-[300px] mb-8 mt-8 ${!selectedSize ? 'tooltip-wrapper' : ''}`} data-tooltip-id="add-to-cart-tooltip" data-tooltip-content="Оберіть розмір">
                            <Button
                                loading={loading}
                                onClick={() => onSubmit?.(items.find((item) => item.size === selectedSize)?.id)}
                                className="h-full px-10 text-base rounded-[18px] w-full"
                                disabled={!selectedSize}
                            >
                                <ShoppingCart size={22} className="mr-3" /> Додати в кошик
                            </Button>
                        </div>
                        {!selectedSize && <Tooltip id="add-to-cart-tooltip" />}
                    </>
                ) : (
                    <Button loading={loading} variant="outline" className="h-[55px] px-8 text-base rounded-[18px] w-full md:w-[45%] mb-8 mt-10">
                        <BellRing size={22} className="mr-3" /> Повідомити про наявність
                    </Button>
                )}
                <hr />
                <div className="mt-5 mb-5">
                    <p className="text-lg font-bold">Опис</p>
                    <p className="mt-2">{description}</p>
                </div>
                <hr />
                {complects && complects.length > 0 && <ComplectProductForm currentId={id} complects={complects[0].products} />}
                <hr />
                <TabsProduct />
            </div>
            <SizesTableModal open={openSizeModal} onClose={() => setOpenSizeModal(false)} />
        </div>
    );
};
