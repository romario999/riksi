import { useCategories } from "@/shared/hooks"

interface Props {
    categoryIds: string[]
    setCategoryIds: React.Dispatch<React.SetStateAction<string[]>>
}

export const AdminDiscountCategoryIds: React.FC<Props> = ({categoryIds, setCategoryIds}) => {

    const {categories: allCategories} = useCategories();

    const handleCategoryClick = (categoryId: number) => {
        if (categoryIds.includes(categoryId.toString())) {
            setCategoryIds(categoryIds.filter((id) => id !== categoryId.toString()));
        } else {
            setCategoryIds([...categoryIds, categoryId.toString()]);
        }
    };

    return (
        <div>
            <label htmlFor="categoryIds" className="block text-sm font-medium text-gray-700">
                Застосовується на категорії
            </label>
            <div className="flex gap-2 p-5 flex-col mt-4 w-1/2 bg-gray-100">
                {allCategories.sort((a, b) => a.id - b.id).map((category) => (
                    <div key={category.id}>
                        <span
                            onClick={() => handleCategoryClick(category.id)}
                            className={`cursor-pointer rounded-sm py-1 px-3 transition-colors duration-300 ${
                                categoryIds.includes(category.id.toString())
                                    ? 'bg-gray-400'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}