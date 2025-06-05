import { Button } from "@/shared/components/ui"
import { Title } from "../../title"
import Link from "next/link"

interface Props {
    productName: string
    productUrl: string
    onSave: () => void
    onDeleteProduct: () => void
}

export const AdminProductHeader: React.FC<Props> = ({productName, productUrl, onSave, onDeleteProduct}) => {
    return (
        <div className="flex justify-between pb-5 border-b-2 border-gray-200">
            <div>
                <Title text={productName} />
            </div>
            <div className="flex gap-3">
                <Button onClick={onSave}>Зберегти</Button>
                <Button onClick={onDeleteProduct}>Видалити</Button>
                <Link target="_blank" href={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${productUrl}`}>
                    <Button variant={"outline"}>Товар на сайті</Button>
                </Link>
            </div>
        </div>
    )
}