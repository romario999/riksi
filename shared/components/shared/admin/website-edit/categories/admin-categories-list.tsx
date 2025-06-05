'use client'

import { AdminDeleteCategory } from "@/app/actions"
import { Button } from "@/shared/components/ui"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

interface Props {
    categories: {
        id: number,
        name: string,
        categoryUrl: string,
        subcategories: {
            id: number,
            name: string
        }[],
    }[],
    properties: string[]
}

export const AdminCategoriesList: React.FC<Props> = ({categories, properties}) => {

    const [categoryItems, setCategoryItems] = useState(categories);

    const handleDeleteCategory = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити категорію ${name}?`);
        if (isConfirmed) {
            try {
                await AdminDeleteCategory(id);
                toast.success('Успішно видалено');
                setCategoryItems(categoryItems.filter(category => category.id !== id));
            } catch (error) {
                console.log(error);
                toast.error('Помилка при видаленні категорії');
                throw new Error('Error deleting category');
            }
        }
    }

    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Категорії</h1>
                <Link href={"/admin/website/categories/add-category"}><Button>Додати категорію</Button></Link>
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
                    {categoryItems.sort((a, b) => a.id - b.id).map((value) => (
                        <tr key={value.id} className="bg-white border-b">
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.id}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.name}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.categoryUrl}</td>
                            <td className="py-3 px-14 text-sm font-medium text-gray-900">{value.subcategories.length}</td>
                            <td className="py-3 px-6 text-sm">
                                <div className="flex gap-3 space-x-2">
                                    <Link href={`/admin/website/categories/edit-category/${value.id}`}>
                                        <Pencil size={20} />
                                    </Link>
                                    <Trash2 onClick={() => handleDeleteCategory(value.id, value.name)} size={20} className='cursor-pointer' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}