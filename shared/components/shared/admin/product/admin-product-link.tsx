interface Props {
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>
}

export const AdminProductLink: React.FC<Props> = ({url, setUrl}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Посилання на товар
            </label>
            <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}