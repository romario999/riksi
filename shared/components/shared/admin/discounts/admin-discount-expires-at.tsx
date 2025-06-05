interface Props {
    expiresAt: Date | null;
    setExpiresAt: React.Dispatch<React.SetStateAction<Date | null>>
}

export const AdminDiscountExpiresAt: React.FC<Props> = ({ expiresAt, setExpiresAt }) => {
    const formatDateTimeLocal = (date: Date) => {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    return (
        <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
                Дата та час закінчення
            </label>
            <input
                type="datetime-local"
                id="expiresAt"
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                value={expiresAt ? formatDateTimeLocal(expiresAt) : ''}
                onChange={(e) => setExpiresAt(new Date(e.target.value))}
            />
        </div>
    );
};
