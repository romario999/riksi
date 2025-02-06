'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
    closeSearch: () => void;
}

const SearchOverlay: React.FC<Props> = ({ closeSearch }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [products, setProducts] = React.useState<Product[]>([]);
    const [focused, setFocused] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false); // Додаємо стан видимості
    const ref = React.useRef(null);

    React.useEffect(() => {
        setIsVisible(true); // Активуємо анімацію при відображенні компонента
    }, []);

    const handleClose = () => {
        setIsVisible(false); // Початок анімації закриття
        setTimeout(() => closeSearch(), 300); // Закриваємо компонент після завершення анімації
    };

    useClickAway(ref, () => {
        setFocused(false);
        handleClose();
    });

    useDebounce(async () => {
        try {
            const response = await Api.products.search(searchQuery);
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    }, 250, [searchQuery]);

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
        handleClose();
    };

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex justify-center items-start transition-opacity duration-300",
                isVisible ? 'opacity-100' : 'opacity-0'
            )}
        >
            <div
                className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
                onClick={handleClose}
            />
            
            <div
                ref={ref}
                className={cn(
                    "relative z-50 w-full sm:w-[420px] bg-white shadow-2xl py-6 px-4 flex flex-col transition-transform duration-300 transform",
                    isVisible ? 'translate-y-0' : '-translate-y-10'
                )}
            >
                {/* Кнопка закриття */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors z-50"
                >
                    <span className="text-3xl">&times;</span>
                </button>

                {/* Пошуковий інтерфейс */}
                <div className="flex items-center justify-center px-3 relative w-full mb-4">
                    <Search className="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400" />
                    <input
                        className="rounded-full outline-none w-full bg-gray-100 pl-12 py-3 text-lg placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
                        type="text"
                        placeholder="Знайти..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                    />
                </div>

                {/* Пошукові результати */}
                {products.length > 0 && (
                    <div className="w-full bg-white rounded-xl py-2 mt-4 max-h-full overflow-y-auto flex-grow">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                className="flex items-center gap-4 w-full px-4 py-3 hover:bg-primary/10 cursor-pointer transition-all duration-200"
                                href={`/product/${product.productUrl}`}
                                onClick={onClickItem}
                            >
                                <img
                                    className="rounded-md"
                                    src={product.imageUrl[0]}
                                    width={45}
                                    height={40}
                                    alt={product.name}
                                />
                                <div className="flex flex-col justify-between h-full">
                                    <span className="text-sm font-semibold text-gray-800">{product.name}</span>
                                    <span className="text-sm text-gray-500">
                                        <b>
                                            <span className='text-sm text-gray-500'><b>{product.oldPrice ? <><span className='font-bold'>{product.price}₴</span> <span className='ml-1 text-gray-400 line-through text-[12px]'>{product.oldPrice}₴</span></> : <span className='text-gray-500 font-bold'>{product.price}₴</span>}</b></span>
                                        </b>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;