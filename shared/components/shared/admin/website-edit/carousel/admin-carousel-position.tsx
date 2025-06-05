interface Props {
    position: number | null
    setPosition: React.Dispatch<React.SetStateAction<number | null>>
}

export const AdminCarouselPosition: React.FC<Props> = ({position, setPosition}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Порядковий номер
            </label>
            <input
                type="number"
                id="position"
                value={position || ''}
                onChange={(e) => setPosition(Number(e.target.value))}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}