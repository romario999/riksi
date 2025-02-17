'use client';

import { useState } from "react";
import { ProductCard } from "./product-card";
import { MiniProductCard } from "./mini-product-card";
import { Title } from "./title";
import { useFavorites, useIsMobile } from "@/shared/hooks";
import { FavoriteItems } from "@/shared/store";
import { FaSpinner } from "react-icons/fa6";

export const WishlistList = () => {
    const { favoriteItems, toggleFavorite, favoriteLoading } = useFavorites();
    const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
    const isMobile = useIsMobile(784);

    const handleToggleFavorite = async (product: FavoriteItems) => {
        setLoadingProductId(product.id);
        await toggleFavorite(product);
        setLoadingProductId(null);
    };

    return (
        <div className="min-h-[50vh] md:mt-0 -mt-7">
            <Title text="Обране" size="md" className="font-bold px-3" />
            <hr className="my-6" />
            {favoriteLoading ? (
                <FaSpinner size={24} className="animate-spin my-2 mx-auto" /> // Спінер
            ) : favoriteItems.length === 0 ? (
                <p className="mt-4 mx-auto text-base text-center">Немає обраних товарів</p>
            ) : (
                <div className="flex justify-between w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-9 mx-auto">
                        {favoriteItems.map((product) => (
                            <div key={product.id} className={`relative ${loadingProductId === product.id ? 'opacity-50' : ''}`}>
                                {isMobile ? (
                                    <MiniProductCard
                                        id={product.id}
                                        url={product.productUrl}
                                        name={product.name}
                                        imageUrl={product.imageUrl}
                                        price={product.price}
                                        discountPrice={product.oldPrice}
                                        onToggleFavorite={() => handleToggleFavorite(product)}
                                    />
                                ) : (
                                    <ProductCard
                                        id={product.id}
                                        url={product.productUrl}
                                        name={product.name}
                                        imageUrl={product.imageUrl}
                                        price={product.price}
                                        discountPrice={product.oldPrice}
                                        showBtn={false}
                                        onToggleFavorite={() => handleToggleFavorite(product)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
