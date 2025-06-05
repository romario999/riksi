'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const EditSidebar = () => {
    const pathname = usePathname();

    return (
        <div>
            <div className="fixed top-0 pr-9 left-[64px] bg-gray-100 h-screen">
                <div className="p-5">
                    <h2 className="text-lg font-semibold">Сайт</h2>
                    <ul className="mt-7 flex gap-5 flex-col">
                        <Link href={'/admin/website/carousel'}>
                            <li className={`px-3 py-1 rounded-sm transition-colors ${pathname.startsWith('/admin/website/carousel') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>Карусель</li>
                        </Link>

                        <Link href={'/admin/website/banners'}>
                            <li className={`px-3 py-1 rounded-sm transition-colors ${pathname.startsWith('/admin/website/banners') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>Банери</li>
                        </Link>

                        <Link href={'/admin/website/categories'}>
                            <li className={`px-3 py-1 rounded-sm transition-colors ${pathname.startsWith('/admin/website/categories') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>Категорії</li>
                        </Link>

                        <Link href={'/admin/website/subcategories'}>
                            <li className={`px-3 py-1 rounded-sm transition-colors ${pathname.startsWith('/admin/website/subcategories') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>Підкатегорії</li>
                        </Link>

                        <Link href={'/admin/website/footerpages'}>
                            <li className={`px-3 py-1 rounded-sm transition-colors ${pathname.startsWith('/admin/website/footerpages') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>Футер-сторінки</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
