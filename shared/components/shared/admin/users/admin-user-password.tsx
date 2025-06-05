interface Props {
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
}

export const AdminUserPassword: React.FC<Props> = ({password, setPassword}) => {
    return (
        <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Новий пароль
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
        </div>
    )
}