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

export const FormChooseDepartment: React.FC<Props> = ({ className, name, label, required, selectedCity, ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        clearErrors,
    } = useFormContext();

    const [query, setQuery] = useState('');
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [isLocked, setIsLocked] = useState(false);

    const city = watch("novaPostCity"); 

    useEffect(() => {
        if (!city) {
            setQuery('');
            setWarehouses([]);
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
                        calledMethod: 'getWarehouses',
                        methodProperties: {
                            FindByString: query,
                            CityRef: selectedCity,
                            Limit: 5,
                        },
                    });
                    setWarehouses(response.data.data);
                } catch (error) {
                    console.error(error);
                    setWarehouses([]);
                }
            } else {
                setWarehouses([]);
            }
        },
        700, // Затримка у 300 мс
        [query]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isLocked) return;

        setQuery(e.target.value);
        clearErrors(name);
    };

    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '');
        setQuery('');
        setWarehouses([]);
        setIsLocked(false);
        setValue('idDepartment', '');
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

                {warehouses.length > 0 && (
                    <ul className="border border-gray-300 mt-[1px] p-1 list-none rounded-md">
                        {warehouses.map((warehouse, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setValue(name, warehouse.Description);
                                    setQuery(warehouse.Description);
                                    setWarehouses([]);
                                    setIsLocked(true);
                                    setValue('idDepartment', warehouse.Ref);
                                }}
                                className={cn(
                                    'cursor-pointer py-2 pl-2 hover:bg-gray-100',
                                    {
                                        'border-b border-gray-300': warehouses.length > 1 && index !== warehouses.length - 1,
                                    }
                                )}
                            >
                                {warehouse.Description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
