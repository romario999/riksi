interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

export const AdminUserEmail: React.FC<Props> = ({email, setEmail}) => {
    return (
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}