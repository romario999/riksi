'use client'

import { AdminDeleteFooterPage } from "@/app/actions";
import { Button, Checkbox } from "@/shared/components/ui"
import { FooterPage } from "@prisma/client"
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link"
import { useState } from "react";
import toast from "react-hot-toast";

const properties: string[] = ['ID', 'Назва', 'Посилання', 'Активна', ''];

export const AdminFooterPagesList = ({ footerPages }: { footerPages: FooterPage[]}) => {

    const [allFooterPages, setAllFooterPages] = useState(footerPages);

    const handleDeleteFooterPage = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити сторінку ${name}?`);
        if (isConfirmed) {
            try {
                await AdminDeleteFooterPage(id);
                setAllFooterPages(allFooterPages.filter(footerPage => footerPage.id !== id));
                toast.success('Успішно видалено');
            } catch (error) {
                console.log(error);
                toast.error('Помилка при видаленні сторінки');
                throw new Error('Error deleting footer page');
            }
        }
    }

    return (
        <div className="">
            <div className="">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Футер-сторінки</h1>
                <Link href={"/admin/website/footerpages/add"}><Button>Додати сторінку</Button></Link>
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
                    {allFooterPages.sort((a, b) => a.id - b.id).map((value) => (
                        <tr key={value.id} className="bg-white border-b">
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.id}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.title}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.footerUrl}</td>
                            <td className="py-3 px-11 text-sm font-medium text-gray-900"><Checkbox className="rounded-[8px] w-5 h-5" checked={value.isActive}></Checkbox></td>
                            <td className="py-3 px-6 text-sm">
                                <div className="flex gap-3 space-x-2">
                                    <Link href={`/admin/website/footerpages/edit/${value.id}`}>
                                        <Pencil size={20} />
                                    </Link>
                                    <Trash2 onClick={() => handleDeleteFooterPage(value.id, value.title)} size={20} className='cursor-pointer' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}