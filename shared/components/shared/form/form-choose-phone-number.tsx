'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from "../../ui/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { countries } from '@/shared/constants/phone-number-code';
import { FiChevronDown } from 'react-icons/fi'; // імпорт іконки стрілки вниз

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormChoosePhoneNumber: React.FC<Props> = ({ className, name, label, required, ...props }) => {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const value = watch(name);
    const errorText = errors[name]?.message as string;

    // Мемоізуємо країни для уникнення їх повторного обчислення на кожному ререндері
    const countryOptions = useMemo(() => countries, []);

    // Шукаємо Україну в списку країн за її кодом і встановлюємо її як обрану країну
    const defaultCountry = countryOptions.find(country => country.dial_code === '+380') || countryOptions[0];

    const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null); // Для відслідковування меню
    const buttonRef = useRef<HTMLButtonElement>(null); // Для відслідковування кнопки тригера

    const filteredCountries = countryOptions.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onClickClear = () => {
        setValue(name, '');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Обробка кліку по документу для закриття меню
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
            setIsDropdownOpen(false); // Закриваємо меню при кліку поза межами
        }
    };

    // Додаємо обробник подій при кожному рендері
    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Обробка кліку по кнопці для відкриття/закриття меню
    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState); // Перемикаємо стан меню
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <div className="flex items-center h-12 border  rounded-md">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleDropdown} // Використовуємо toggleDropdown для переключення
                            className="h-11 w-12 text-md rounded-lg bg-white border-none pl-3 mr-2 focus:outline-none flex items-center justify-between"
                            ref={buttonRef} // Додаємо реф до кнопки
                        >
                            {selectedCountry.emoji} {/* Прапор вибраної країни */}
                            <FiChevronDown className="ml-0" /> {/* Стрілка вниз */}
                        </button>
                    </div>

                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef} // Додаємо реф до контейнера меню
                            className="absolute top-full left-0 p-2 w-full mt-2 max-h-80 overflow-y-auto bg-white border rounded-lg shadow-lg z-10"
                        >
                            <Input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="h-12 w-full px-4 border-b border-gray-300"
                                placeholder="Пошук країни..."
                            />
                            <ul className="max-h-64 overflow-y-auto">
                                {filteredCountries.map((country) => (
                                    <li
                                        key={country.code}
                                        onClick={() => {
                                            setSelectedCountry(country);
                                            setIsDropdownOpen(false); // Закриваємо список після вибору
                                            onClickClear();
                                        }}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                                    >
                                        {country.emoji} {country.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Input
                        type="tel"
                        className="h-12 text-md flex-1 border-none rounded-l-none pl-3"
                        {...register(name)}
                        {...props}
                        placeholder={selectedCountry.dial_code}
                    />
                </div>

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
