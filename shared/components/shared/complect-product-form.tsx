import React from 'react';
import { MiniProductCard } from './mini-product-card';

interface Props {
    currentId: number;
    complects: any;
}

export const ComplectProductForm: React.FC<Props> = ({ complects, currentId }) => {
    const filteredComplects = complects.filter((complect: any) => complect.id !== currentId);

    return (
        <div className="mb-5 mt-5">
            <p className="text-lg font-bold">Заверши свій образ:</p>
            <div className="flex gap-4 overflow-x-auto">
                {filteredComplects.map((complect: any) => (
                    <MiniProductCard
                        className="flex-shrink-0 w-full" // Фіксуємо ширину картки
                        key={complect.id}
                        id={complect.id}
                        url={complect.productUrl}
                        name={complect.name}
                        imageUrl={complect.imageUrl}
                        price={complect.price}
                        discountPrice={complect.oldPrice}
                    />
                ))}
            </div>
        </div>
    );
};
