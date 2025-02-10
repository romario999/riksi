'use client';

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "./dropdown";
import { MenuButton } from "./menu-button";
import { useClickAway } from "react-use";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    hasMenu?: boolean;
    classname?: string;
    bg?: string;
}

const AuthModal = dynamic(() => import('./modals/auth-modal/auth-modal'), { ssr: false });
const SearchOverlay = dynamic(() => import("./search-overlay"), { ssr: false });


export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, classname, hasMenu = true, bg = 'bg-white' }) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSearchOverlayOpen, setSearchOverlayOpen] = React.useState(false); // Додаємо стан для пошукового overlay
    const ref = React.useRef<HTMLDivElement>(null);
    const menuButtonRef = React.useRef<HTMLDivElement>(null);

    useClickAway(ref, (event) => {
        if (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node)) {
            return;
        }
        setIsOpen(false);
    });

    React.useEffect(() => {
        let toastMessage = '';
        if (searchParams?.has('paid')) {
            toastMessage = 'Замовлення успішно оплачено!';
        }

        if (searchParams?.has('verified')) {
            toastMessage = 'Пошта успішно підтверджена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    const handleMenuButtonClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSearchClick = () => {
        setSearchOverlayOpen(true); // Відкриваємо компонент пошуку
    };

    const closeSearchOverlay = () => {
        setSearchOverlayOpen(false); // Закриваємо компонент пошуку
    };

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Відключаємо прокручування
        } else {
            document.body.style.overflow = "auto"; // Включаємо прокручування
        }
    }, [isOpen]);

    return (
        <>
            <div
                className={`fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out ${
                    isOpen ? "opacity-40" : "opacity-0 pointer-events-none"
                }`}
            />

            <header className={cn('fixed top-0 left-0 right-0 z-50 border-b bg-white', classname, `${bg}`)}>
                <Container className="flex items-center justify-between py-2 px-4 sm:py-5">
                    {/* Ліва частина */}
                    {hasMenu && (
                        <div ref={menuButtonRef}>
                            <MenuButton isOpen={isOpen} setIsOpen={handleMenuButtonClick} />
                        </div>
                    )}

                    {/* Іконка пошуку на малих екранах, правіше за кнопку меню */}
                    {hasSearch && (
                        <div className="sm:hidden ml-4">
                            <Search size={24} className="text-black" onClick={handleSearchClick} />
                        </div>
                    )}

                    {/* Лого по центру */}
                    <Link href="/" className={`${!hasSearch && !hasMenu && !hasCart ? '' : 'mx-auto'}`}>
                        <div className="flex items-center gap-4 justify-center">
                            <img src="/riksi.webp" alt="Logo" className="w-24 h-12" />
                        </div>
                    </Link>

                    {hasSearch && (
                        <div className="mx-10 flex-1 hidden sm:block">
                            <SearchInput />
                        </div>
                    )}

                    {/* Права частина */}
                    <div className="flex items-center gap-3">
                        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                        <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                        {hasCart && (
                            <div>
                                <CartButton />
                            </div>
                        )}
                    </div>
                </Container>
            </header>

            {/* Основний контент з відступом */}
            <div className="pt-[80px]">
                {/* Інший контент сторінки */}
            </div>

            {/* Меню (фіксоване, під хедером) */}
            <div
                ref={ref}
                className={`fixed sm:top-[80px] top-[30px] right-0 bg-white shadow-lg rounded-b-lg w-full transition-transform duration-500 ease-in-out transform z-40 ${
                    isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
                style={{
                    maxHeight: '100%', // максимальна висота для меню, можна налаштувати за потребою
                    overflowY: 'auto', // додає вертикальний скроллбар
                }}
            >
                <DropdownMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>



            {/* Компонент пошуку, відкривається при кліку */}
            {isSearchOverlayOpen && <SearchOverlay closeSearch={closeSearchOverlay} />}
        </>
    );
};
