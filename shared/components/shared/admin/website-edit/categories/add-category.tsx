'use client'

import { Button } from "@/shared/components/ui";
import { useEffect, useState } from "react";
import { AdminCategoryName } from "./admin-category-name";
import { AdminCategoryDescription } from "./admin-category-description";
import { AdminCategoryCategoryurl } from "./admin-category-categoryurl";
import { slugify } from "transliteration";
import toast from "react-hot-toast";
import { AdminAddCategory } from "@/app/actions";

export const AddCategory = () => {
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryUrl, setCategoryUrl] = useState("");

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
            setCategoryUrl(generateSlug(name));
        }, [name]);

    const handleAddCategory = async () => {
        try {
            if (!name || !categoryUrl) {
                toast.error('Заповніть всі поля');
                return;
            }

            const newCategory = {
                name,
                description,
                categoryUrl,
            };

            await AdminAddCategory(newCategory);

            toast.success('Категорію додано');
        } catch(e) {
            toast.error('Помилка при додаванні категорії');
            console.error('Error [ADMIN_ADD_CATEGORY]', e);
            throw e;
        }
    }

    return (

        <div>
            <div className="flex justify-end">
                <Button onClick={handleAddCategory}>Зберегти</Button>
            </div>
            <AdminCategoryName name={name} setName={setName} />

            <AdminCategoryDescription description={description} setDescription={setDescription} />

            <AdminCategoryCategoryurl categoryUrl={categoryUrl} setCategoryUrl={setCategoryUrl} />

        </div>
    );
}