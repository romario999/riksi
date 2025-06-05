import { Category } from "@prisma/client"

interface Props {
    categoryId: number | null
    setCategoryId: React.Dispatch<React.SetStateAction<number>> | any
    allCategories: Category[]
}

export const AdminSubcategoryCategories: React.FC<Props> = ({categoryId, setCategoryId, allCategories}) => {
    return (
        <div>
            <span className="block text-sm font-medium text-gray-700">Належить до категорії</span>

            <div className="flex gap-2 p-5 flex-col mt-4 w-1/2 bg-gray-100">
                {allCategories.sort((a, b) => a.id - b.id).map((category) => (
                    <div key={category.id}>
                        <span
                            onClick={() => setCategoryId(category.id)}
                            className={`cursor-pointer rounded-sm py-1 px-3 transition-colors duration-300 ${
                                category.id === categoryId
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