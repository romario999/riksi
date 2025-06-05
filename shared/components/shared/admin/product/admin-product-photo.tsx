import { Info, Trash2Icon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>
    productLink: string;
}

export const AdminProductPhoto: React.FC<Props> = ({images, setImages, productLink}) => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData("index", index.toString());
    };
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        const draggedIndex = Number(event.dataTransfer.getData("index"));
        if (draggedIndex === targetIndex) return;

        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(draggedIndex, 1);
        updatedImages.splice(targetIndex, 0, movedImage);
        setImages(updatedImages);
    };

    const handleRemoveImage = async (index: number, imageUrl: string) => {
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
                const updatedImages = images.filter((_, i) => i !== index);
                setImages(updatedImages);
                toast.success("Фото успішно видалено");
            } else {
                toast.error("Помилка при видаленні фото");
            }
        } catch (error) {
            console.error("Помилка при видаленні фото:", error);
            toast.error("Сталася помилка при видаленні фото");
        }
    };

    const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            toast.error("Файл не знайдено");
            return;
        }
    
        const productUrl = productLink; // Підставлюємо URL продукту
        const fileSizeLimit = 5 * 1024 * 1024; // 5MB
    
        Array.from(files).forEach(async (file) => {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            const allowedExtensions = ["jpg", "jpeg", "png", "webp", "svg"];
    
            if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                toast.error("Дозволені формати: jpg, jpeg, png, webp, svg");
                return;
            }
    
            if (file.size > fileSizeLimit) {
                toast.error("Розмір файлу перевищує 2MB");
                return;
            }
    
            // Генерація імені файлу на основі поточного часу
            const timeStamp = Date.now(); // Використовуємо мілісекунди як частину імені
            const fileName = `${timeStamp}.${fileExtension}`;
    
            const formData = new FormData();
            formData.append("file", file);
            formData.append("productUrl", productUrl);
            formData.append("index", String(timeStamp)); // Використовуємо timeStamp як унікальний індекс
            formData.append("folder", "products");
    
            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
    
                if (!res.ok) throw new Error("Не вдалося завантажити зображення");
    
                const data = await res.json();
                setImages((prev) => [...prev, data.url]);
            } catch (error) {
                console.error("Помилка завантаження:", error);
            }
        });
    };
    
    
    
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Фото товару</label>
            <div className="flex gap-4 flex-wrap mt-4">
            {images.map((image, index) => (
                <div
                key={index}
                className="flex cursor-grab active:cursor-grabbing"
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, index)}
                >
                    <Link href={image} target="_blank">
                        <img src={image} alt={`Image ${index}`} className="rounded-lg w-20" />
                    </Link>
                    <Trash2Icon size={18} className="text-gray-500" onClick={() => handleRemoveImage(index, image)} />
                </div>
            ))}
            </div>
            <label 
                htmlFor="file-upload" 
                className="mt-4 flex items-center justify-center w-[400px] px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            >
                <span className="text-gray-700">Додати фото</span>
                <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleAddImage}
                />
            </label>
            <span className="flex mt-4 gap-3 text-gray-500 text-sm"><Info size={19} /> Для зміни порядку фотографій товару, просто перетягніть їх</span>
        </div>
    )
}