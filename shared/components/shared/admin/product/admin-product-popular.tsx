interface Props {
    popularity: number | null 
    setPopularity: React.Dispatch<React.SetStateAction<number | null>>
}

export const AdminProductPopular: React.FC<Props> = ({popularity, setPopularity}) => {
    return (
        <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Популярність
            </label>
            <input
                type="text"
                id="popularity"
                value={popularity || ''}
                onChange={(e) => setPopularity(Number(e.target.value))}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}