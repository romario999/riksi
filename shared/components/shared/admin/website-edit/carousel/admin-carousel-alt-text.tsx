interface Props {
    text: string | null
    setText: React.Dispatch<React.SetStateAction<string | null>>
}

export const AdminCarouselAltText: React.FC<Props> = ({text, setText}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Alt-текст зображення
            </label>
            <input
                type="text"
                id="text"
                value={text || ''}
                onChange={(e) => setText(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}