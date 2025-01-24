'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from "../../ui/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import React from "react";
import axios from "axios";
import { cn } from "@/shared/lib/utils";
import { useDebounce } from "react-use";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    selectedCity: string;
}

export const FormChooseStreet: React.FC<Props> = ({ className, name, label, required, selectedCity, ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const [query, setQuery] = useState('');
    const [streets, setStreets] = useState<any[]>([]);
    const [isLocked, setIsLocked] = useState(false);

    const city = watch("novaPostCity"); 

    useEffect(() => {
        if (!city) {
            setQuery('');
            setStreets([]);
            setValue(name, '');
            setIsLocked(false);
        }
    }, [city, setValue, name]);

    useDebounce(
        async () => {
            if (query.length > 0 && !isLocked) {
                try {
                    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                        apiKey: process.env.NOVAPOSHTA_API_KEY,
                        modelName: 'AddressGeneral',
                        calledMethod: 'searchSettlementStreets',
                        methodProperties: {
                            StreetName: query,
                            SettlementRef: selectedCity,
                            Limit: 5,
                        },
                    });
                    setStreets(response.data.data[0].Addresses);
                } catch (error) {
                    console.error(error);
                    setStreets([]);
                }
            } else {
                setStreets([]);
            }
        },
        700, // Затримка у 300 мс
        [query]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isLocked) return;

        setQuery(e.target.value);
    };

    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '');
        setQuery('');
        setStreets([]);
        setIsLocked(false);
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input
                    value={query}
                    onChange={handleInputChange}
                    readOnly={isLocked}
                    className="h-12 text-md pr-10"
                    {...props}
                />

                {query && <ClearButton onClick={onClickClear} />}

                {streets.length > 0 && (
                    <ul className="border border-gray-300 mt-[1px] p-1 list-none rounded-md">
                        {streets.map((street, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setValue(name, String(street.Present));
                                    setQuery(street.Present);
                                    setStreets([]);
                                    setIsLocked(true);
                                }}
                                className={cn(
                                    'cursor-pointer py-2 pl-2 hover:bg-gray-100',
                                    {
                                        'border-b border-gray-300': streets.length > 1 && index !== streets.length - 1,
                                    }
                                )}
                            >
                                {street.Present}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
