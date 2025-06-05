'use client';

import { useState } from "react";
import { AdminCategoryName } from "./admin-category-name";
import { AdminCategoryDescription } from "./admin-category-description";
import { AdminCategoryCategoryurl } from "./admin-category-categoryurl";
import { AdminCategoryViewSubcategories } from "./admin-category-view-subcategories";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminUpdateCategory } from "@/app/actions";
import { AdminCategoryDiscount } from "./admin-category-discount";

export const EditCategory = ({ category }: { category: any }) => {

    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [categoryUrl, setCategoryUrl] = useState(category.categoryUrl);
    const [subcategories, setSubcategories] = useState(category.subcategories);
    const [categoryDiscount, setCategoryDiscount] = useState(category.discountPercent);

    const handleSaveCategoryChanges = async () => {
        try {
            if (!name || !categoryUrl) {
                toast.error('Заповніть всі поля');
                return;
            }
    
            const updatedCategory = {
                id: category.id,
                name,
                description,
                categoryUrl,
                discountPercent: String(categoryDiscount) || null
            };
    
            await AdminUpdateCategory(updatedCategory, category.id);

            toast.success('Категорію оновлено');
        } catch(e) {
            toast.error('Помилка при оновленні категорії');
            console.error('Error [ADMIN_UPDATE_CATEGORY]', e);
            throw e;
        }
    }

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={handleSaveCategoryChanges}>Зберегти</Button>
            </div>
            <AdminCategoryName name={name} setName={setName} />

            <AdminCategoryDescription description={description} setDescription={setDescription} />

            <AdminCategoryCategoryurl categoryUrl={categoryUrl} setCategoryUrl={setCategoryUrl} />

            <AdminCategoryViewSubcategories subcategories={subcategories} />

            <AdminCategoryDiscount categoryDiscount={categoryDiscount} setCategoryDiscount={setCategoryDiscount} />
        </div>
    )
}