import { Checkbox } from "@/shared/components/ui";
import { ProductStickers } from "@prisma/client";

interface Props {
    selectedStickers: (keyof typeof ProductStickers)[];
    setSelectedStickers: React.Dispatch<React.SetStateAction<(keyof typeof ProductStickers)[]>>;
}

export const AdminProductStickers: React.FC<Props> = ({selectedStickers, setSelectedStickers}) => {

    const stickers = Object.keys(ProductStickers) as (keyof typeof ProductStickers)[];
    
    const handleStickerChange = (sticker: keyof typeof ProductStickers) => {
        if (selectedStickers.includes(sticker)) {
            setSelectedStickers(selectedStickers.filter((s) => s !== sticker));
        } else {
            setSelectedStickers([...selectedStickers, sticker]);
        }
    }

    return (
        <div className="mb-4 ">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Стікери
            </label>
            <div className="flex flex-col gap-3 mt-4">
            {stickers.map((sticker) => (
                <div key={sticker} className="flex items-center">
                    <Checkbox
                        id={`sticker-${sticker}`}
                        className="rounded-[8px] w-5 h-5" 
                        checked={selectedStickers.includes(sticker)}
                        onCheckedChange={() => handleStickerChange(sticker)}
                    />
                    <span className="ml-2">{sticker}</span>
                </div>
            ))}
            </div>
        </div>
    )
}