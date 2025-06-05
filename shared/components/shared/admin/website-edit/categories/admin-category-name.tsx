interface Props {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    label?: string
}

export const AdminCategoryName: React.FC<Props> = ({name, setName, label}) => {
    return (
        <div className="mb-4">
            <label htmlFor="nameCategory" className="block text-sm font-medium text-gray-700">
                {label || 'Назва категорії'}
            </label>
            <input
                type="text"
                id="nameCategory"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}