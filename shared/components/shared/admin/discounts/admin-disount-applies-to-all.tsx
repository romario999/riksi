import { Checkbox } from "@/shared/components/ui";

interface Props {
    appliesToAll: boolean;
    setAppliesToAll: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminDiscountAppliesToAll: React.FC<Props> = ({appliesToAll, setAppliesToAll}) => {
    return (
        <div className="my-4">
            <label htmlFor="appliesToAll" className="block text-sm font-medium text-gray-700">
                Застосовується на всі товари
            </label>
            <Checkbox 
                className="rounded-[8px] mt-3 w-5 h-5" 
                checked={appliesToAll || false} 
                onCheckedChange={() => setAppliesToAll(!appliesToAll)} 
            />
        </div>
    );
};