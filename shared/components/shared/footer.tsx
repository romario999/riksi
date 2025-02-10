'use client';

import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { FaViber, FaTelegram } from "react-icons/fa6";
import { LuInstagram, LuFacebook } from "react-icons/lu";
import React from 'react';
import Link from 'next/link';
import { useCategories, useFooter } from '@/shared/hooks';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const CallMeModal = dynamic(() => import('./modals/call-me-modal'), { ssr: false });

export const Footer =  () => {
    const [openCallModal, setOpenCallModal] = React.useState(false);

    const {categories} = useCategories();
    const {footerPages} = useFooter();

    return (
        <>
            <CallMeModal open={openCallModal} onClose={() => setOpenCallModal(false)} />
            <footer className="flex flex-wrap justify-around p-10 bg-black text-white">
                <div className="max-w-[800px] mb-6 xl:mb-0">
                    <Link href="/">
                    <Image
                        src="https://riksi.ua/content/images/2/400x200l90nn0/39929893234509.webp"
                        alt="RIKSI Logo Footer"
                        width={120} // Встановіть ширину в пікселях
                        height={60} // Встановіть висоту в пікселях (пропорційно)
                        className="sm:w-[180px]"
                    />
                    </Link>
                    <p className="text-sm">©2020-{new Date().getFullYear()}</p>
                </div>

                <div className="flex-col gap-4 hidden xl:block">
                    <h5 className="font-bold">Каталог</h5>
                    <ul className="flex flex-col gap-1">
                        {categories.map((item, i) => (
                            <li key={i}>
                                <Link href={`/catalog/${item.categoryUrl}`} className="text-sm">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-col gap-4 hidden xl:block">
                    <h5 className="font-bold">Клієнтам</h5>
                    <ul className="flex flex-col gap-1">
                        {footerPages.map((item, i) => (
                            <li key={i}>
                                <Link href={`/${item.footerUrl}`} className="text-sm">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4 mb-6 xl:mb-0">
                    <h5 className="font-bold">Контактна інформація</h5>
                    <ul className="flex flex-col gap-1">
                        <li className="flex text-sm items-center">
                            <a href="tel:+380950216006" className="flex">
                                <PhoneCall size={16} className="mr-2" />
                                0950216006
                            </a>
                        </li>
                        <li className="flex text-sm items-center">
                            <a href="tel:+380992478447" className="flex">
                                <PhoneCall size={16} className="mr-2" />
                                0992478447
                            </a>
                        </li>
                        <li className="flex text-sm items-center">
                            <a href="tel:+380957917571" className="flex">
                                <PhoneCall size={16} className="mr-2" />
                                0957917571 (для зауважень та пропозицій)
                            </a>
                        </li>
                        <li className="text-sm cursor-pointer" onClick={() => setOpenCallModal(true)}>Передзвонити вам?</li>
                        <li className="flex text-sm items-center">
                            <a href="tel:+380992478447" className="flex">
                                <FaViber size={16} className="mr-2" />
                                0992478447
                            </a>
                        </li>
                        <li className="flex text-sm items-center">
                            <a href="https://t.me/riksi_ua" className="flex">
                                <FaTelegram size={16} className="mr-2" />
                                @riksi_ua
                            </a>
                        </li>
                        <li className="flex text-sm items-center">
                            <a href="mailto:riksi.factory@gmail.com" className="flex">
                                <Mail size={16} className="mr-2" />
                                riksi.factory@gmail.com
                            </a>
                        </li>
                    </ul>
                    <span className="flex mt-2 text-sm items-center">
                        <MapPin size={16} className="mr-2" />
                        Чернігівська область, місто Прилуки
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    Приєднуйся до нас:
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/riksi_ua/" target="_blank" rel="noopener noreferrer">
                            <LuInstagram size={24} />
                        </a>
                        <a href="https://www.facebook.com/riksi.ua" target="_blank" rel="noopener noreferrer">
                            <LuFacebook size={24} />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
};
