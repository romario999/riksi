interface Props {
    categories: any[] | undefined;
    setCategories: React.Dispatch<React.SetStateAction<any[]>>;
    subcategories: any[] | undefined;
    setSubcategories: React.Dispatch<React.SetStateAction<any[]>>;
    allCategories: {
        id: number;
        name: string;
        subcategories: {
            id: number;
            name: string;
        }[]
    }[];
    productId: number | undefined;
}

export const AdminProductCategories: React.FC<Props> = ({categories, setCategories, subcategories, setSubcategories, allCategories, productId}) => {

    const handleCategoryClick = (categoryId: number) => {
        setCategories(prev =>
            prev.some(cat => cat.categoryId === categoryId)
                ? prev.filter(cat => cat.categoryId !== categoryId)
                : [...prev, { productId: productId, categoryId }]
        );
    };

    const handleSubcategoryClick = (subcategoryId: number) => {
        setSubcategories(prev =>
            prev.some(sub => sub.subcategoryId === subcategoryId)
                ? prev.filter(sub => sub.subcategoryId !== subcategoryId)
                : [...prev, { productId: productId, subcategoryId }]
        );
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Категорії</label>
            <div className="flex gap-2 p-5 flex-col mt-4 h-[400px] w-1/2 bg-gray-100 overflow-y-scroll">
                        {allCategories.sort((a, b) => a.id - b.id).map((category) => (
                            <div key={category.id}>
                                <span
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={`font-bold cursor-pointer rounded-sm py-1 px-3 transition-colors duration-300 ${
                                        categories?.some(s => s.categoryId === category.id)
                                            ? 'bg-gray-400'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    {category.name}
                                </span>

                                {category.subcategories.length > 0 && (
                                    <div className="ml-4 mt-1 flex flex-wrap gap-x-5">
                                        {category.subcategories.map((subcategory) => (
                                            <div
                                                key={subcategory.id}
                                                onClick={() => handleSubcategoryClick(subcategory.id)}
                                                className={`py-1 px-5 cursor-pointer rounded-md transition-colors duration-300 ${
                                                    subcategories?.some(s => s.subcategoryId === subcategory.id)
                                                        ? 'bg-gray-400'
                                                        : 'hover:bg-gray-50'
                                                }`}
                                            >
                                                <span>{subcategory.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
            </div>
        </div>
    )
}