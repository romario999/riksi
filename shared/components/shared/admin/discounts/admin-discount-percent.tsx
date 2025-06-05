interface Props {
    discountPercent: number
    setDiscountPercent: React.Dispatch<React.SetStateAction<number>>
}

export const AdminDiscountPercent: React.FC<Props> = ({discountPercent, setDiscountPercent}) => {
    return (
        <div className="mb-4">
            <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700">
                % знижки
            </label>
            <input
                type="number"
                id="discountPercent"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}