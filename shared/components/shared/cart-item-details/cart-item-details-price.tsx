import { cn } from "@/shared/lib/utils";

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold text-xs ml-2 xs:text-lg', className)}>{value}₴</h2>;
};
