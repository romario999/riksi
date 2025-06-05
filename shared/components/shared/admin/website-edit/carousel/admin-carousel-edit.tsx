'use client';

import { BannerImage, SliderImage } from "@prisma/client";
import { useState } from "react";
import { AdminCarouselName } from "./admin-carousel-name";
import { AdminCarouselAltText } from "./admin-carousel-alt-text";
import { AdminCarouselLink } from "./admin-carousel-link";
import { AdminCarouselPosition } from "./admin-carousel-position";
import { AdminCarouselIsActive } from "./admin-carousel-is-active";
import { AdminCarouselIsMobile } from "./admin-carousel-is-mobile";
import { AdminCarouselPhoto } from "./admin-carousel-photo";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminDeleteWebsiteEditData, AdminUpdateWebsiteEditData } from "@/app/actions";

interface Props {
    carouselItem: SliderImage | BannerImage;
    type: "slider" | "banner";
}

export const AdminCarouselEdit: React.FC<Props> = ({carouselItem, type}) => {

    const [name, setName] = useState<string>(carouselItem.name);
    const [altText, setAltText] = useState<string | null>(carouselItem.altText);
    const [link, setLink] = useState<string | null>(carouselItem.link);
    const [position, setPosition] = useState<number | null>(carouselItem.position);
    const [imageUrl, setImageUrl] = useState<string>(carouselItem?.imageUrl);
    const [isActive, setIsActive] = useState<boolean>(carouselItem.isActive);
    const [isMobile, setIsMobile] = useState<boolean>(carouselItem.isMobile);

    const handleUpdateData = async () => {
        try {
            const data = {
                name,
                altText,
                link,
                position,
                imageUrl,
                isActive,
                isMobile,
            };

            await AdminUpdateWebsiteEditData(carouselItem.id, data, type);

            toast.success("Дані успішно оновлено");
        } catch (error) {
            toast.error("Помилка при оновленні даних");
            console.log(error);
            throw new Error('Error updating data');
        }

    }

    const handleDeleteData = async () => {
        const isConfirmed = window.confirm(`Ви дійсно хочете видалити ${name}?`);
        if (isConfirmed) {
            try {
                await AdminDeleteWebsiteEditData(carouselItem.id, type);
                toast.success('Успішно видалено');
                if(type === 'slider') {
                    window.location.href = '/admin/website/carousel';
                }
                if(type === 'banner') {
                    window.location.href = '/admin/website/banners';
                }
            } catch (error) {
                console.error('Error deleting data:', error);
                toast.error('Помилка при видаленні даних');
            }
        }
    }

    return (
        <div className="px-3">
            <div className="flex gap-3 justify-end">
                <Button onClick={handleDeleteData} variant={"outline"}>Видалити</Button>
                <Button onClick={handleUpdateData}>Зберегти</Button>
            </div>
            <AdminCarouselName name={name} setName={setName} />

            <AdminCarouselAltText text={altText} setText={setAltText} />

            <AdminCarouselLink link={link} setLink={setLink} />

            <AdminCarouselPosition position={position} setPosition={setPosition} />

            <AdminCarouselPhoto imageUrl={imageUrl} setImageUrl={setImageUrl} />

            <AdminCarouselIsActive isActive={isActive} setIsActive={setIsActive} />

            <AdminCarouselIsMobile isMobile={isMobile} setIsMobile={setIsMobile} />
        </div>
    );
};