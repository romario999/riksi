'use client'

import { Trash2Icon } from "lucide-react"
import Link from "next/link"
import React from "react"
import toast from "react-hot-toast"

interface Props {
    imageUrl: string
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

export const AdminCarouselPhoto: React.FC<Props> = ({imageUrl, setImageUrl}) => {

    const [loading, setLoading] = React.useState(false);

    const handleRemoveImage = async (imageUrl: string) => {
        try {
            const res = await fetch("/api/delete-image", {
                method: "POST",
                body: new URLSearchParams({ imageUrl }),
            });
    
            if (!res.ok) {
                throw new Error("Не вдалося видалити фото");
            }
    
            const data = await res.json();
            if (data.message === "Файл успішно видалено") {
                // Оновлюємо список зображень
                setImageUrl("");
                toast.success("Фото успішно видалено");
            } else {
                toast.error("Помилка при видаленні фото");
            }
        } catch (error) {
            console.error("Помилка при видаленні фото:", error);
            toast.error("Сталася помилка при видаленні фото");
        }
    }

    const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const file = e.target.files?.[0];

        if (!file) {
            toast.error("Файл не знайдено");
            setLoading(false);
            return;
        }

        const fileSizeLimit = 5 * 1024 * 1024;
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const allowedExtensions = ["jpg", "jpeg", "png", "webp", "svg"];

        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            toast.error("Дозволені формати: jpg, jpeg, png, webp, svg");
            setLoading(false);
            return;
        }

        if (file.size > fileSizeLimit) {
            toast.error("Розмір файлу перевищує 5MB");
            setLoading(false);
            return;
        }

        const timeStamp = Date.now();
        const fileName = `${timeStamp}.${fileExtension}`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("productUrl", "1");
        formData.append("index", String(timeStamp));
        formData.append("folder", "carousel");

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
    
            if (!res.ok) {
                setLoading(false);
                throw new Error("Не вдалося завантажити зображення")
            };
    
            const data = await res.json();
            setImageUrl(data.url);
            setLoading(false);
        } catch (error) {
            console.error("Помилка завантаження:", error);
            toast.error("Сталася помилка при завантаженні фото");
        }
    }
    

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Фото</label>
            <div className="flex gap-4 flex-wrap mt-4">
                {imageUrl ? (
                    <div
                    className="flex"
                    >
                        <Link href={imageUrl} target="_blank">
                            <img src={imageUrl} alt={`Image ${imageUrl}`} className="rounded-sm w-[400px]" />
                        </Link>
                        <Trash2Icon size={18} className="text-gray-500 cursor-pointer" onClick={() => handleRemoveImage(imageUrl)} />
                    </div>
                ) : <span className="text-gray-500 text-sm">Немає фото</span>}
            </div>

            {!imageUrl && (
                <label 
                htmlFor="file-upload" 
                className={`${loading ? "opacity-50 cursor-not-allowed" : ""} mt-4 flex items-center justify-center w-[400px] px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition`}
            >
                <span className="text-gray-700">Додати фото</span>
                <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleAddImage}
                />
            </label>
            )}
        </div>
    )
}