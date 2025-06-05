import { Checkbox } from "@/shared/components/ui"

interface Props {
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminCarouselIsMobile: React.FC<Props> = ({isMobile, setIsMobile}) => {

    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Для мобільної версії
            </label>
            <Checkbox 
                className="rounded-[8px] mt-3 w-5 h-5" 
                checked={isMobile || false} 
                onCheckedChange={() => setIsMobile(!isMobile)} 
            />
        </div>
    )
}