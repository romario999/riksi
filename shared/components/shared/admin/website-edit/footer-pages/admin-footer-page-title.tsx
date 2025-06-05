interface Props {
    state: string | null
    setState: React.Dispatch<React.SetStateAction<string>> | any
    value: string
}

export const AdminFooterPageInput: React.FC<Props> = ({state, setState, value}) => {
    return (
        <div className="mb-4">
            <label htmlFor={value} className="block text-sm font-medium text-gray-700">
                {value}
            </label>
            <input
                type="text"
                id={value}
                value={state || ''}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}