'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product, ProductComplect } from '@prisma/client';
import { Search } from 'lucide-react';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
    originalProduct: Product;
    className?: string;
    setComplects: React.Dispatch<React.SetStateAction<ProductComplect[]>>;
    complects: any;
}

export const AdminSearchInputComplects: React.FC<Props> = ({ originalProduct, className, complects, setComplects }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [products, setProducts] = React.useState<Product[]>([])
    const [focused, setFocused] = React.useState(false);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(async () => {
        try {
            const response = await Api.products.search(searchQuery);
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    }, 250, [searchQuery]);

    const handleAddProductToComplect = (product: Product) => {
        if (complects.length === 0) {
            setComplects([{ ...complects[0], products: [originalProduct, product] }]);
            return;
        }
        const updatedComplects = complects.map((complect: { products: Product[]; }) => {    
            return {
                ...complect,
                products: [...complect.products, product], // Створюємо новий масив, додаючи товар
            };
        });
    
        setComplects(updatedComplects);
    };

  return (
    <>
        {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}
        <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
            <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
            <input className='rounded-2xl outline-none w-full bg-gray-100 pl-11' 
                type="text" 
                placeholder='Знайти...' 
                onFocus={() => setFocused(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {products.length > 0 && <div className={cn(
                'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                focused && 'visible opacity-100 top-12'
            )}>
               {
                    products.map(product => (
                        <div key={product.id} onClick={() => handleAddProductToComplect(product)} className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer'>
                            <img className='rounded' src={product.imageUrl[0]} width={35} height={30} alt={product.name} />
                            <span>
                                {product.name} <br />
                            </span>
                        </div>
                    ))
               }
            </div>}
        </div>
    </>
  );
};