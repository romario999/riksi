import React from "react";
import { Button } from "../../../ui";
import { deleteAdminProductItem, updateAdminProductItem } from "@/app/actions";
import { AddProductItem } from "./admin-add-product-item";
import toast from "react-hot-toast";

interface Props {
    item: AddProductItem;
    items: AddProductItem[];
    setItems: React.Dispatch<React.SetStateAction<AddProductItem[]>>;
}

export const AdminViewProductItem: React.FC<Props> = ({ item, items, setItems }) => {
    const [editingItem, setEditingItem] = React.useState(item);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        // Оновлюємо тільки локальний стейт editingItem
        setEditingItem(prevItem => {
            const updatedItem = { ...prevItem };
            if (id === "itemPrice") {
                updatedItem.price = Number(value);
            } else if (id === "itemOldPrice") {
                updatedItem.oldPrice = value ? Number(value) : null;
            } else if (id === "size") {
                updatedItem.size = value;
            } else if (id === "sku") {
                updatedItem.sku = value;
            } else if (id === 'stock') {
                updatedItem.stock = value === 'true';
            }
            return updatedItem;
        });
    };

    const handleDeleteProductItem = async (sku: string) => {
        try {
            const isConfirmed = window.confirm(`Ви дійсно хочете варіацію із артикулом ${sku} видалити?`);
    
            if (isConfirmed) {
                setItems(items.filter(item => item.sku !== sku));
                await deleteAdminProductItem(sku);
                toast.success('Варіацію успішно видалено');
            }
        } catch (error) {
            toast.error('Виникла помилка, спробуйте пізніше');
            console.error('Error [DELETE_ADMIN_PRODUCT_ITEM]', error);
            throw error;
        }
    };
    
    const handleSaveChanges = async (sku: string) => {
        try {
            setItems(items.map(item => item.sku === editingItem.sku ? editingItem : item));
            await updateAdminProductItem(sku, editingItem);
            toast.success('Зміни успішно збережено');

        } catch (error) {
            toast.error('Виникла помилка, спробуйте пізніше');
            console.error('Error [UPDATE_ADMIN_PRODUCT_ITEM]', error);
            throw error;
        }
    };

    return (
        <>
            <div className="mb-4">
                <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700">
                    Ціна
                </label>
                <input
                    type="number"
                    id="itemPrice"
                    value={editingItem.price || ''}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="itemOldPrice" className="block text-sm font-medium text-gray-700">
                    Стара ціна
                </label>
                <input
                    type="number"
                    id="itemOldPrice"
                    value={editingItem.oldPrice || ''}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                    Артикул
                </label>
                <input
                    type="text"
                    id="sku"
                    value={editingItem.sku || ''}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                    Розмір
                </label>
                <input
                    type="text"
                    id="size"
                    value={editingItem.size || ''}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Наявність
                </label>
                <select
                    id="stock"
                    value={editingItem.stock ? 'true' : 'false'}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                >
                    <option value="true">В наявності</option>
                    <option value="false">Немає в наявності</option>
                </select>
            </div>

            <div className="flex gap-3">
                <Button onClick={() => handleSaveChanges(editingItem.sku)}>Зберегти варіацію</Button>
                <Button onClick={() => handleDeleteProductItem(editingItem.sku)}>Видалити варіацію</Button>
            </div>
        </>
    );
};
