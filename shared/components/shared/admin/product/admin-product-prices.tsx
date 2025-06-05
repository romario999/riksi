interface Props {
    price: number
    setPrice: React.Dispatch<React.SetStateAction<number>>
    oldPrice: number | null | undefined
    setOldPrice: React.Dispatch<React.SetStateAction<number | null>>
}

export const AdminProductPrices: React.FC<Props> = ({price, setPrice, oldPrice, setOldPrice}) => {
    return (
        <>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Ціна
                </label>
                <input
                    type="text"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Стара ціна
                </label>
                <input
                    type="text"
                    id="oldPrice"
                    value={oldPrice || ''}
                    onChange={(e) => setOldPrice(Number(e.target.value))}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
            </div>
        </>
    )
}