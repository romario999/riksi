'use client';

import { AdminAddSliderImage } from "@/app/actions";
import { Button } from "@/shared/components";
import { AdminCarouselAltText } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-alt-text";
import { AdminCarouselIsActive } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-is-active";
import { AdminCarouselIsMobile } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-is-mobile";
import { AdminCarouselLink } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-link";
import { AdminCarouselName } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-name";
import { AdminCarouselPhoto } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-photo";
import { AdminCarouselPosition } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-position";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminWebsiteCarouselAddPage() {
    const [name, setName] = useState<string>('');
    const [altText, setAltText] = useState<string | null>('');
    const [link, setLink] = useState<string | null>(null);
    const [position, setPosition] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleAddData = async () => {
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

            if (name.length < 3 || imageUrl.length < 1) {
                toast.error('Заповніть всі обовʼязкові поля');
                return;
            }

            await AdminAddSliderImage(data);
            toast.success('Елемент каруселі успішно додано');

            setName('');
            setAltText('');
            setLink(null);
            setPosition(null);
            setImageUrl('');
            setIsActive(false);
            setIsMobile(false);
            
        } catch (error) {
            console.log(error);
            toast.error('Помилка при додаванні елементу каруселі');
            throw new Error('Error adding carousel item');
        }
    }
    return (
        <div>
            <div className="flex justify-end mb-3">
                <Button onClick={handleAddData}>Додати</Button>
            </div>
            <AdminCarouselName 
                name={name} 
                setName={setName} 
            />
            
            <AdminCarouselAltText 
                text={altText} 
                setText={setAltText} 
            />
            
            <AdminCarouselLink 
                link={link} 
                setLink={setLink} 
            />

            <AdminCarouselPosition 
                position={position} 
                setPosition={setPosition} 
            />

            <AdminCarouselPhoto 
                imageUrl={imageUrl} 
                setImageUrl={setImageUrl} 
            />

            <AdminCarouselIsActive 
                isActive={isActive} 
                setIsActive={setIsActive} 
            />

            <AdminCarouselIsMobile 
                isMobile={isMobile} 
                setIsMobile={setIsMobile} 
            />
        </div>
    )
}