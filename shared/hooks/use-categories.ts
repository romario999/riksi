import { Api } from "@/shared/services/api-client";
import { Category, Subcategory } from "@prisma/client";
import React from "react";

export const useCategories = () => {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [subcategories, setSubcategories] = React.useState<Subcategory[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        async function fetchCategoriesAndSubcategories() {
            try {
                setLoading(true);
                const categories = await Api.categories.getAll();
                const subcategories = await Api.subcategories.getAll();
                setCategories(categories);
                setSubcategories(subcategories);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategoriesAndSubcategories();
    }, []);

    return {
        categories,
        subcategories,
        loading,
    };
};
