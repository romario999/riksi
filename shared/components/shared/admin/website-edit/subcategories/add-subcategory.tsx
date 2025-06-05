'use client'

import { Button } from "@/shared/components/ui";
import { useEffect, useState } from "react";
import { slugify } from "transliteration";
import toast from "react-hot-toast";
import { AdminAddSubcategory } from "@/app/actions";
import { AdminCategoryName } from "../categories/admin-category-name";
import { AdminCategoryDescription } from "../categories/admin-category-description";
import { AdminCategoryCategoryurl } from "../categories/admin-category-categoryurl";
import { AdminSubcategoryCategories } from "./admin-subcategory-categories";
import { Category } from "@prisma/client";
import {  AdminAddSubcategoryType } from "@/@types/admin-add-subcategory";

export const AddSubcategory = ({allCategories}: {allCategories: Category[]}) => {
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [subcategoryUrl, setSubcategoryUrl] = useState("");
    const [categoryId, setCategoryId] = useState(null);


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
            setSubcategoryUrl(generateSlug(name));
        }, [name]);

    const handleAddSubcategory = async () => {
        try {
            if (!name || !subcategoryUrl) {
                toast.error('Заповніть всі поля');
                return;
            }

            const newSubcategory = {
                name,
                description,
                subcategoryUrl,
                categoryId: categoryId || 0,
            };

            await AdminAddSubcategory(newSubcategory);

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
                <Button onClick={handleAddSubcategory}>Зберегти</Button>
            </div>
            <AdminCategoryName name={name} setName={setName} label="Назва підкатегорії" />

            <AdminCategoryDescription description={description} setDescription={setDescription} label="Опис підкатегорії" />

            <AdminCategoryCategoryurl categoryUrl={subcategoryUrl} setCategoryUrl={setSubcategoryUrl} label="Посилання на підкатегорію" />

            <AdminSubcategoryCategories categoryId={categoryId} setCategoryId={setCategoryId} allCategories={allCategories} />
        </div>
    );
}