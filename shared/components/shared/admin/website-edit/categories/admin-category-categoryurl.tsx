interface Props {
    categoryUrl: string
    setCategoryUrl: React.Dispatch<React.SetStateAction<string>>
    label?: string
}

export const AdminCategoryCategoryurl: React.FC<Props> = ({categoryUrl, setCategoryUrl, label}) => {
    return (
        <div className="mb-4">
            <label htmlFor="urlCategory" className="block text-sm font-medium text-gray-700">
               {label || 'Посилання на категорію'}
            </label>
            <input
                type="text"
                id="urlCategory"
                value={categoryUrl}
                onChange={(e) => setCategoryUrl(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}