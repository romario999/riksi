interface Props {
    description: string | null
    setDescription: React.Dispatch<React.SetStateAction<string | null>>
}

export const AdminProductDescription: React.FC<Props> = ({description, setDescription}) => {
    return (
        <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Опис товару
            </label>
            <textarea
                id="description"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows={4}
            />
        </div>
    )
}