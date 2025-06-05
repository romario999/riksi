interface Props {
    color: string | null
    setColor: React.Dispatch<React.SetStateAction<string | null>>
}

export const AdminProductColor: React.FC<Props> = ({color, setColor}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Колір
            </label>
            <input
                type="text"
                id="color"
                value={color || ''}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}