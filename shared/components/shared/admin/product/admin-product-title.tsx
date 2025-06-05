interface Props {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
}

export const AdminProductTitle: React.FC<Props> = ({name, setName}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Назва товару
            </label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}