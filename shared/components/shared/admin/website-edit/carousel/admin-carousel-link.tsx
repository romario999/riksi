interface Props {
    link: string | null
    setLink: React.Dispatch<React.SetStateAction<string | null>>
}

export const AdminCarouselLink: React.FC<Props> = ({link, setLink}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Посилання, на яке веде фото
            </label>
            <input
                type="text"
                id="link"
                value={link || ''}
                onChange={(e) => setLink(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}