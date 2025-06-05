interface Props {
    stock: boolean | undefined;
    setStock: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminProductStock: React.FC<Props> = ({stock, setStock}) => {
    return (
        <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Наявність
            </label>
            <select
                id="stock"
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                defaultValue={stock ? 'true' : 'false'}
                onChange={(e) => setStock(e.target.value === 'true')}
            >
                <option value="true">В наявності</option>
                <option value="false">Немає в наявності</option>
            </select>
        </div>
    )
}