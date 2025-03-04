'use client';

import React, { useEffect, useState } from 'react';
import { FormChooseCity, FormChooseDepartment, FormChooseStreet, FormInput } from './form';
import { useFormContext } from 'react-hook-form';
import SelectNovaPostTypeDelivery from './select-nova-post-type-delivery';
import FormChooseNumberStreet from './form/form-choose-number-street';

const NovaPoshtaInputs = () => {
    const { watch, setValue } = useFormContext();
    const [selectedCityRef, setSelectedCityRef] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleCityChange = (cityRef: any) => {
        setSelectedCityRef(cityRef); 
        setValue('department', '');
        setValue('street', '');
        setValue('numberStreet', '');
        setValue('novaPostTypeDelivery', ''); // Скидаємо значення в формі
        setSelectedType(null); // Скидаємо локальний стан
    };

    useEffect(() => {
        if (selectedType === 'department') {
            setValue('street', '');
            setValue('numberStreet', '');
        } else if (selectedType === 'courier') {
            setValue('department', '');
            setValue('idDepartment', '');
        }
    }, [selectedType, setValue]);

    const onValueChange = (value: string | null) => {
        setSelectedType(value);
    };

    return (
        <div className="flex flex-wrap w-full mt-5 gap-3 sm:gap-5">
            <FormChooseCity
                name="novaPostCity"
                className="text-base w-full sm:w-1/2"
                placeholder="Місто/населений пункт"
                onCitySelect={handleCityChange}
            />
            <SelectNovaPostTypeDelivery 
                disabled={!watch("novaPostCity")} 
                className="w-full sm:w-[46%]" 
                onValueChange={onValueChange} 
                value={selectedType || ''}
            />
            {selectedType === 'department' && (
                <FormChooseDepartment
                    name="department"
                    className="text-base w-full sm:w-1/2"
                    placeholder="Відділення/поштомат"
                    disabled={!watch("novaPostCity")}
                    selectedCity={selectedCityRef?.DeliveryCity} 
                />
            )}
            {selectedType === 'courier' && (
                <div className='flex flex-wrap w-full gap-3 sm:gap-5'>
                    <FormChooseStreet
                        name="street"
                        className="text-base w-full sm:w-1/2"
                        placeholder="Вулиця"
                        disabled={!watch("novaPostCity")}
                        selectedCity={selectedCityRef?.Ref}
                    />
                    <FormChooseNumberStreet
                        name="numberStreet"
                        className="text-base w-full sm:w-1/2"
                        disabled={!watch("novaPostCity")}
                        placeholder="Номер будинку" 
                    />
                </div>
            )}
        </div>
    );
};

export default NovaPoshtaInputs;
