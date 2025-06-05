'use client'

import { AdminDeleteWebsiteEditData } from "@/app/actions";
import { Button, Checkbox } from "@/shared/components/ui"
import { BannerImage, SliderImage } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import React from "react";
import toast from "react-hot-toast";

interface Props {
    values: SliderImage[] | BannerImage[];
    props: string;
}

const properties = ["ID", "Назва", "Порядок зображення", "Мобільна версія", ""];

export const WebsiteEdit: React.FC<Props> = ({values, props}) => {

    const [items, setItems] = React.useState<SliderImage[] | BannerImage[]>(values);

    const handleDeleteWebsiteData = async (id: number) => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити?`);
        if (isConfirmed) {
            try {
                const type = props === 'carousel' ? 'slider' : 'banner';
                await AdminDeleteWebsiteEditData(id, type);
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                toast.success('Успішно видалено');
            } catch (error) {
                console.log(error);
                toast.error('Помилка при видаленні даних');
                throw new Error('Error deleting data');
            }
        }
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Link href={`/admin/website/${props}/add`}>
                    <Button>Додати</Button>
                </Link>
            </div>
            <table className="min-w-full table-auto">
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
                {items.sort((a, b) => a.id - b.id).map((value: SliderImage | BannerImage) => (
                    <tr key={value.id} className="bg-white border-b">
                        <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.id}</td>
                        <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.name}</td>
                        <td className="py-3 px-14 text-sm font-medium text-gray-900">{value.position}</td>
                        <td className="py-3 px-11 text-sm font-medium text-gray-900"><Checkbox className="rounded-[8px] w-5 h-5" checked={value.isMobile}></Checkbox></td>
                        <td className="py-3 px-6 text-sm">
                            <div className="flex gap-3 space-x-2">
                                <Link href={`/admin/website/${props}/${value.id}`}>
                                    <Pencil size={20} />
                                </Link>
                                <Trash2 onClick={() => handleDeleteWebsiteData(value.id)} size={20} className='cursor-pointer' />
                            </div>
                  </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}