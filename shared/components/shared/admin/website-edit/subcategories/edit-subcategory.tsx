'use client';

import { useState } from "react";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminCategoryCategoryurl } from "../categories/admin-category-categoryurl";
import { AdminCategoryDescription } from "../categories/admin-category-description";
import { AdminCategoryName } from "../categories/admin-category-name";
import { Category } from "@prisma/client";
import { AdminSubcategoryCategories } from "./admin-subcategory-categories";
import { AdminUpdateSubcategory } from "@/app/actions";

export const EditSubcategory = ({ subcategory, allCategories }: { subcategory: any, allCategories: Category[] }) => {

    const [name, setName] = useState(subcategory.name);
    const [description, setDescription] = useState(subcategory.description);
    const [subcategoryUrl, setSubcategoryUrl] = useState(subcategory.subcategoryUrl);
    const [categoryId, setCategoryId] = useState(subcategory.categoryId);

    const handleSaveSubcategoryChanges = async () => {
        try {
            if (!name || !subcategoryUrl || !categoryId) {
                toast.error('Заповніть всі поля');
                return;
            }

            const updatedSubcategory = {
                id: subcategory.id,
                name,
                description,
                subcategoryUrl,
                categoryId,
            };

            await AdminUpdateSubcategory(updatedSubcategory, subcategory.id);

            toast.success('Підкатегорію оновлено');
        } catch(e) {
            toast.error('Помилка при оновленні категорії');
            console.error('Error [ADMIN_UPDATE_CATEGORY]', e);
            throw e;
        }
    }

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={handleSaveSubcategoryChanges}>Зберегти</Button>
            </div>
            <AdminCategoryName name={name} setName={setName} label="Назва підкатегорії" />

            <AdminCategoryDescription description={description} setDescription={setDescription} label="Опис підкатегорії" />

            <AdminCategoryCategoryurl categoryUrl={subcategoryUrl} setCategoryUrl={setSubcategoryUrl} label="Посилання на підкатегорію" />

            <AdminSubcategoryCategories categoryId={categoryId} setCategoryId={setCategoryId} allCategories={allCategories} />
        </div>
    )
}