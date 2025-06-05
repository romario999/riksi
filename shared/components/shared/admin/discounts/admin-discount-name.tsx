interface Props {
    promocodeName: string
    setPromocodeName: React.Dispatch<React.SetStateAction<string>>
}

export const AdminDiscountName: React.FC<Props> = ({promocodeName, setPromocodeName}) => {
    return (
        <div className="mb-4">
            <label htmlFor="promocodeName" className="block text-sm font-medium text-gray-700">
                Промокод
            </label>
            <input
                type="text"
                id="promocodeName"
                value={promocodeName}
                onChange={(e) => setPromocodeName(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}