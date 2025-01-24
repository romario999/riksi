import { cn } from "@/shared/lib/utils";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className='text-sm font-bold flex-1 leading-6 xs:text-lg'>{name}</h2>
      </div>
      {details && <p className="text-[10px] text-gray-400 w-[90%] xs:text-xs">{details}</p>}
    </div>
  );
};
