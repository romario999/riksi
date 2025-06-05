interface Props {
    categoryDiscount: string | null
    setCategoryDiscount: React.Dispatch<React.SetStateAction<string | null>>
}

export const AdminCategoryDiscount: React.FC<Props> = ({categoryDiscount, setCategoryDiscount}) => {
    return (
        <div className="my-4">
            <label htmlFor="discountCategory" className="block text-sm font-medium text-gray-700">
                Знижка до категорії (в %)
            </label>
            <input
                type="text"
                id="nameCategory"
                value={categoryDiscount || ''}
                onChange={(e) => setCategoryDiscount(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}