import React, { useEffect, useState } from 'react';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '../../ui';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';

interface FormChooseNumberStreetProps {
    name: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

const FormChooseNumberStreet: React.FC<FormChooseNumberStreetProps> = ({ 
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

        const city = watch("novaPostCity");
        const value = watch(name);
        const deliveryType = watch("novaPoshtaDeliveryType");
        const street = watch("street");

        const errorText = errors[name]?.message as string;

            useEffect(() => {
                if (!city) {
                    setValue(name, '');
                }
                if(!deliveryType) {
                    setValue(name, '');
                }

                if(!street) {
                    setValue(name, '');
                }
            }, [city, street, deliveryType, setValue, name]);
    
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

export default FormChooseNumberStreet;