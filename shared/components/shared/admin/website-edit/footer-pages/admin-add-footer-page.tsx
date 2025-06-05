'use client'

import { Button } from "@/shared/components/ui"
import { AdminFooterPageContent } from "./admin-footer-page-content"
import { AdminFooterPageIsActive } from "./admin-footer-page-is-active"
import { AdminFooterPageInput } from "./admin-footer-page-title"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { slugify } from "transliteration"
import { AdminFooterPageAdd } from "@/app/actions"

export const AdminAddFooterPage = () => {

    const [title, setTitle] = useState('');
    const [secondTitle, setSecondTitle] = useState('');
    const [footerUrl, setFooterUrl] = useState('');
    const [content, setContent] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleFooterPageAdd = async () => {
        try {
            if(title.length < 3 || footerUrl.length < 3) {
                toast.error('Заповніть всі поля!')
                return;
            }

            const newPage = {
                title,
                secondTitle,
                footerUrl,
                content,
                isActive,
            }
            await AdminFooterPageAdd(newPage);
            toast.success('Успішно додано сторінку футеру');
        } catch (error) {
            toast.error('Помилка при додаванні сторінки футеру');
            console.log(error);
            throw new Error('Error adding footer page');
        }
    }

    const generateSlug = (text: string): string => {
            const customReplacements: Record<string, string> = {
                "а": "a", "б": "b", "в": "v", "г": "h", "ґ": "g", "д": "d",
                "е": "e", "є": "ye", "ж": "zh", "з": "z", "и": "y", "і": "i",
                "ї": "yi", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n",
                "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
                "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
                "ь": "", "ю": "yu", "я": "ya"
            };
    
            let processedText = text.toLowerCase().replace(/./g, (char) => customReplacements[char] || char);
        
            return slugify(processedText, {
                lowercase: true,
                separator: "-",
                trim: true
            });
        };
        
    useEffect(() => {
        setFooterUrl(generateSlug(title));
    }, [title]);

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={handleFooterPageAdd}>Додати</Button>
            </div>

            <AdminFooterPageInput state={title} setState={setTitle} value={"Назва"} />

            <AdminFooterPageInput state={secondTitle} setState={setSecondTitle} value={"Друга назва"} />

            <AdminFooterPageInput state={footerUrl} setState={setFooterUrl} value={"Посилання"} />

            <AdminFooterPageContent content={content} setContent={setContent} />

            <AdminFooterPageIsActive isActive={isActive} setIsActive={setIsActive} />
        </div>
    )
}