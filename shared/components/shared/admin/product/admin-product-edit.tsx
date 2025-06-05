'use client';

import { Product, ProductItem } from "@prisma/client";
import { useState } from "react";
import { AdminItemAccordion } from "../productItem/admin-item-accordion";
import { AdminProductComplect } from "./admin-product-complect";
import { AdminProductCategories } from "./admin-product-categories";
import { AdminProductPhoto } from "./admin-product-photo";
import { AdminProductStickers } from "./admin-product-stickers";
import { AdminProductColor } from "./admin-product-color";
import { AdminProductLink } from "./admin-product-link";
import { AdminProductPopular } from "./admin-product-popular";
import { AdminProductDescription } from "./admin-product-description";
import { AdminProductPrices } from "./admin-product-prices";
import { AdminProductTitle } from "./admin-product-title";
import { AdminProductHeader } from "./admin-product-header";
import { adminUpdateProductData, deleteProduct } from "@/app/actions";
import toast from "react-hot-toast";
import { AdminProductStock } from "./admin-product-stock";

interface Props {
    product: Product & {
        items: ProductItem[];
    };
    productCategories: {
        productId: number;
        categoryId: number
    }[];
    productSubcategories: {
        productId: number;
        subcategoryId: number
    }[];
    allCategories: {
        id: number;
        name: string;
        subcategories: {
            id: number;
            name: string;
        }[]
    }[];
    productComplects: any
}

export const AdminProductEdit: React.FC<Props> = ({ product, productCategories, productSubcategories, allCategories, productComplects }) => {
    const [name, setName] = useState<string>(product.name);
    const [price, setPrice] = useState<number>(product.price);
    const [oldPrice, setOldPrice] = useState<number | null>(product.oldPrice);
    const [description, setDescription] = useState<string | null>(product.description);
    const [stock, setStock] = useState<boolean>(product.stock);
    const [popularity, setPopularity] = useState<number | null>(product.popularity);
    const [url, setUrl] = useState<string>(product.productUrl);
    const [selectedStickers, setSelectedStickers] = useState(product.sticker)
    const [color, setColor] = useState<string | null>(product.color);
    const [images, setImages] = useState<string[]>(product.imageUrl);
    const [categories, setCategories] = useState(productCategories);
    const [subcategories, setSubcategories] = useState(productSubcategories);
    const [complects, setComplects] = useState(productComplects);
    const [items, setItems] = useState(product.items);

    
    const handleSubmit = async () => {
        try {
            const updatedProduct = {
                name,
                price,
                oldPrice,
                description,
                stock,
                popularity,
                items,
                url,
                selectedStickers,
                color,
                images,
                categories,
                subcategories,
                complects
            };

            await adminUpdateProductData(product.id, updatedProduct);
            toast.success('Товар успішно оновлено');
        } catch (error) {
            toast.error('Помилка при оновленні товару');
            console.error(error);
            throw error;
        }
    };

    const onDeleteProduct = async () => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити товар ${name}?`);
        if (isConfirmed) {
            try {
                await deleteProduct(product.id);
                toast.success('Товар успішно видалено');
                window.location.href = '/admin/products';
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Помилка при видаленні товару');
            }
        }
    }


    return (
        <div>
            <AdminProductHeader
                productName={name}
                productUrl={url}
                onSave={handleSubmit}
                onDeleteProduct={onDeleteProduct}
            />

            <div className="mt-6">
                <AdminItemAccordion productItems={items} setAddProductItems={setItems} productId={product.id} />
            </div>

            <div className="mt-6">
                <AdminProductTitle 
                    name={name}
                    setName={setName}
                />

                <AdminProductPrices 
                    price={price}
                    setPrice={setPrice}
                    oldPrice={oldPrice}
                    setOldPrice={setOldPrice}
                />

                <AdminProductDescription 
                    description={description}
                    setDescription={setDescription}
                />

                <AdminProductStock 
                    stock={stock}
                    setStock={setStock}
                />

                <AdminProductPopular 
                    popularity={popularity}
                    setPopularity={setPopularity}
                />
                
                <AdminProductLink 
                    url={url}
                    setUrl={setUrl}
                />

                <AdminProductColor 
                    color={color}
                    setColor={setColor}
                />

                <AdminProductStickers
                    selectedStickers={selectedStickers}
                    setSelectedStickers={setSelectedStickers} 
                />

                <AdminProductPhoto 
                    images={images} 
                    setImages={setImages} 
                    productLink={url}
                />

                <AdminProductCategories
                    categories={categories}
                    setCategories={setCategories}
                    subcategories={subcategories}
                    setSubcategories={setSubcategories}
                    allCategories={allCategories}
                    productId={product.id}
                />
                
                <AdminProductComplect 
                    product={product}
                    complects={complects} 
                    setComplects={setComplects} 
                />
            </div>
        </div>
    );
};
