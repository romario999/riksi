'use client';

import React, { useEffect, useState } from 'react';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '../../ui';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';

interface FormChooseUkrpostDepartmentProps {
    name: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

export const FormChooseUkrpostDepartment: React.FC<FormChooseUkrpostDepartmentProps> = ({ 
    name,
    label,
    disabled,
    placeholder,
    required,
    className,
    ...props
 }) => {
       const {
            register,
            formState: { errors },
            watch,
            setValue,
        } = useFormContext();

        const city = watch("ukrPostCity");
        const deliveryType = watch("deliveryType");
        const value = watch(name);

        useEffect(() => {
            if (!city || deliveryType) {
                setValue(name, '');
            }
        }, [city, deliveryType, setValue, name]);

        const errorText = errors[name]?.message as string;
    
        const onClickClear = () => {
            setValue(name, '');
        }

    return (
        <div className={className}>
                    {label && (
                        <p className="font-medium mb-2">
                            {label} {required && <RequiredSymbol />}
                        </p>
                    )}
        
                    <div className="relative">
                        <Input className="h-12 text-md" disabled={disabled} placeholder={placeholder} {...register(name)} {...props} />
                       
                        {value && <ClearButton onClick={onClickClear} />}
                    </div>
        
                   {errorText && <ErrorText text={errorText} className="mt-2" />}
                </div>
    );
};
