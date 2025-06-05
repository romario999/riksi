'use client';

import { useEffect, useState } from "react";
import { AdminProductTitle } from "./admin-product-title";
import { AdminProductPrices } from "./admin-product-prices";
import { AdminProductDescription } from "./admin-product-description";
import { AdminProductStock } from "./admin-product-stock";
import { AdminProductPopular } from "./admin-product-popular";
import { AdminProductLink } from "./admin-product-link";
import { AdminProductColor } from "./admin-product-color";
import { AdminProductStickers } from "./admin-product-stickers";
import { AdminProductPhoto } from "./admin-product-photo";
import { AdminProductCategories } from "./admin-product-categories";
import { ProductItem, ProductStickers } from "@prisma/client";
import { slugify } from "transliteration";
import { Button } from "@/shared/components/ui";
import { addAdminProduct } from "@/app/actions";
import { AdminAddProduct } from "@/@types/admin-add-product";
import { AdminItemAccordion } from "../productItem/admin-item-accordion";
import toast from "react-hot-toast";


interface Props {
    allCategories: {
        id: number;
        name: string;
        subcategories: {
            id: number;
            name: string;
        }[]
    }[];
}

export const AdminProductAdd: React.FC<Props> = ({ allCategories }) => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [oldPrice, setOldPrice] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>("");
    const [stock, setStock] = useState<boolean>(true);
    const [popularity, setPopularity] = useState<number | null>(null);
    const [url, setUrl] = useState<string>("");
    const [selectedStickers, setSelectedStickers] = useState<(ProductStickers)[]>([])
    const [color, setColor] = useState<string | null>("");
    const [images, setImages] = useState<string[]>([]);
    const [categories, setCategories] = useState<{ productId: number, categoryId: number }[]>([]);
    const [subcategories, setSubcategories] = useState<{ productId: number, subcategoryId: number }[]>([]);
    const [items, setItems] = useState<ProductItem[]>([]);

    const generateSlug = (text: string): string => {
        const customReplacements: Record<string, string> = {
            "а": "a", "б": "b", "в": "v", "г": "h", "ґ": "g", "д": "d",
            "е": "e", "є": "ye", "ж": "zh", "з": "z", "и": "y", "і": "i",
            "ї": "yi", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n",
            "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
            "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
            "ь": "", "ю": "yu", "я": "ya"
        };

        let processedText = text.toLowerCase().replace(/./g, (char) => customReplacements[char] || char);
    
        return slugify(processedText, {
            lowercase: true,
            separator: "-",
            trim: true
        });
    };

    useEffect(() => {
        setUrl(generateSlug(name));
    }, [name]);

    const onAddProduct = async () => {
        try {
            if (name === "" || price === 0  || url === "" || images.length === 0 || categories.length === 0) {
                toast.error("Заповніть всі обов'язкові поля");
                return;
            }
    
            const data: AdminAddProduct = {
                name,
                price,
                oldPrice,
                description,
                stock,
                popularity,
                productUrl: url,
                color,
                selectedStickers,
                images,
                categories,
                subcategories,
                items
            };
            
            await addAdminProduct(data);

            toast.success("Товар успішно додано");

            setName("");
            setPrice(0);
            setOldPrice(null);
            setDescription("");
            setStock(true);
            setPopularity(null);
            setUrl("");
            setColor("");
            setImages([]);
            setCategories([]);
            setSubcategories([]);
            setSelectedStickers([]);
            setItems([]);
            setOldPrice(null);
            setPrice(0);
            setDescription("");
            setStock(true);
            setPopularity(null);
            setUrl("");
            setColor("");
            setImages([]);
            setCategories([]);
            setSubcategories([]);
            setSelectedStickers([]);
            setItems([]);
        } catch (error) {
            console.log(error);
            toast.error("Помилка при додаванні товару");
        }
    }

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={onAddProduct}>Додати товар та зберегти</Button>
            </div>

            <AdminItemAccordion productItems={items} setAddProductItems={setItems}  />

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
                    productId={undefined}
                />
            </div>
        </>
    )
}