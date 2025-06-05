'use client'

import { AdminDeleteSubcategory } from "@/app/actions"
import { Button } from "@/shared/components/ui"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

interface Props {
    subcategories: {
        id: number,
        name: string,
        description: string | null,
        subcategoryUrl: string,
        category: {
            name: string
        },
        categoryId: number,
        createdAt: Date
        updatedAt: Date
    }[]
    properties: string[]
}

export const AdminSubcategoriesList: React.FC<Props> = ({ subcategories, properties }) => {
    const [subcategoryItems, setSubcategoryItems] = useState(subcategories)
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const handleDeleteSubcategory = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити підкатегорію ${name}?`)
        if (isConfirmed) {
            try {
                await AdminDeleteSubcategory(id);
                toast.success('Успішно видалено')
                setSubcategoryItems(subcategoryItems.filter(subcategory => subcategory.id !== id))
            } catch (error) {
                console.log(error)
                toast.error('Помилка при видаленні підкатегорії')
                throw new Error('Error deleting subcategory')
            }
        }
    }

    const uniqueCategories = Array.from(new Set(subcategoryItems.map(item => item.category.name)))

    const filteredSubcategories = selectedCategory
        ? subcategoryItems.filter(item => item.category.name === selectedCategory)
        : subcategoryItems

    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Категорії</h1>
                <Link href={"/admin/website/subcategories/add-subcategory"}>
                    <Button>Додати підкатегорію</Button>
                </Link>
            </div>

            <div className="mb-4">
                <label htmlFor="category-select" className="mr-2 font-medium">Сортувати за категорією:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value="">Усі категорії</option>
                    {uniqueCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
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
                    {filteredSubcategories.sort((a, b) => a.id - b.id).map((value) => (
                        <tr key={value.id} className="bg-white border-b">
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.id}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.name}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.subcategoryUrl}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">{value.category.name}</td>
                            <td className="py-3 px-6 text-sm">
                                <div className="flex gap-3 space-x-2">
                                    <Link href={`/admin/website/subcategories/edit-subcategory/${value.id}`}>
                                        <Pencil size={20} />
                                    </Link>
                                    <Trash2 onClick={() => handleDeleteSubcategory(value.id, value.name)} size={20} className='cursor-pointer' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
