import { Checkbox } from "@/shared/components/ui"

interface Props {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminFooterPageIsActive: React.FC<Props> = ({isActive, setIsActive}) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Активний
            </label>
            <Checkbox 
                className="rounded-[8px] mt-3 w-5 h-5" 
                checked={isActive || false} 
                onCheckedChange={() => setIsActive(!isActive)} 
            />
        </div>
    )
}