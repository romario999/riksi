'use client'

import { FooterPage } from "@prisma/client"
import { useState } from "react";
import { AdminFooterPageInput } from "./admin-footer-page-title";
import { AdminFooterPageContent } from "./admin-footer-page-content";
import { AdminFooterPageIsActive } from "./admin-footer-page-is-active";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminFooterPageSave } from "@/app/actions";

export const AdminFooterPageEdit = ({ footerPage }: { footerPage: FooterPage}) => {

    const [title, setTitle] = useState(footerPage.title);
    const [secondTitle, setSecondTitle] = useState(footerPage.secondTitle);
    const [footerUrl, setFooterUrl] = useState(footerPage.footerUrl);
    const [content, setContent] = useState(footerPage.content);
    const [isActive, setIsActive] = useState(footerPage.isActive);

    const handleFooterPageEdit = async () => {
        try {
            const editedPage = {
                title,
                secondTitle,
                footerUrl,
                content,
                isActive,
            }
            await AdminFooterPageSave(editedPage, footerPage.id);
            toast.success('Успішно оновлено сторінку футеру');
        } catch (error) {
            toast.error('Помилка при оновленні сторінки футеру');
            console.log(error);
            throw new Error('Error editing footer page');
        }
    }

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={handleFooterPageEdit}>Зберегти</Button>
            </div>

            <AdminFooterPageInput state={title} setState={setTitle} value={"Назва"} />

            <AdminFooterPageInput state={secondTitle} setState={setSecondTitle} value={"Друга назва"} />

            <AdminFooterPageInput state={footerUrl} setState={setFooterUrl} value={"Посилання"} />

            <AdminFooterPageContent content={content} setContent={setContent} />

            <AdminFooterPageIsActive isActive={isActive} setIsActive={setIsActive} />
        </div>
    )
}