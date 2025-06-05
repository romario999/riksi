'use client'

import { AdminDeletePromoCode } from "@/app/actions"
import { Button, Checkbox } from "@/shared/components/ui"
import { PromoCode } from "@prisma/client"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

const properties: string[] = ['ID', 'Промокод', '% знижки', 'Активний', '']

export const AdminPromoCodeList = ({ promocodes }: { promocodes: PromoCode[]}) => {

    const [promo, setPromo] = useState(promocodes);

    const handleDeletePromocode = async (id: number, code: string) => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити промокод ${code}?`);
        if (isConfirmed) {
            try {
                await AdminDeletePromoCode(id);
                setPromo(promo.filter((item) => item.id !== id));
                toast.success('Успішно видалено');
            } catch (error) {
                console.log(error);
                toast.error('Помилка при видаленні сторінки');
                throw new Error('Error deleting footer page');
            }
        }
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h4 className="text-2xl font-semibold mb-4">Промокоди</h4>
                <Link href={'/admin/discounts/add'}><Button>Додати промокод</Button></Link>
            </div>
            <table className="min-w-full table-auto w-full">
                <thead className="bg-gray-100">
                    <tr>
                        {properties.map((property, index) => (
                            <th key={index} className="py-3 px-6 text-left text-sm font-medium text-gray-900">
                                {property}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {promo.sort((a, b) => a.id - b.id).map((value) => (
                        <tr key={value.id} className="bg-white border-b">
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.id}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.code}</td>
                            <td className="py-3 px-11 text-sm font-medium text-gray-900">{value.discountPercent}</td>
                            <td className="py-3 px-11 text-sm font-medium text-gray-900"><Checkbox className="rounded-[8px] w-5 h-5" checked={value.active}></Checkbox></td>
                            <td className="text-sm">
                                <div className="flex gap-3 space-x-2">
                                    <Link href={`/admin/discounts/edit/${value.id}`}>
                                        <Pencil size={20} />
                                    </Link>
                                    <Trash2 onClick={() => handleDeletePromocode(value.id, value.code)} size={20} className='cursor-pointer' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}