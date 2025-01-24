'use client';

import React, { useEffect, useState } from 'react';
import { FormChooseCity, FormChooseUkrpostDepartment } from './form';
import { useFormContext } from 'react-hook-form';

const UkrPostInputs = () => {
    const [selectedCityRef, setSelectedCityRef] = useState<any>(null);

    const { watch, setValue } = useFormContext();
    const typeDelivery = watch("deliveryType");
    const city = watch("ukrPostCity");

    useEffect(() => {
        if (typeDelivery == 'ukr-post') {
            setValue('ukrPostDepartment', '');
            setValue('ukrPostCity', '');
        }
    }, [typeDelivery, setValue]);

    const handleCityChange = (cityRef: any) => {
        setSelectedCityRef(cityRef); 
        setValue('ukrPostDepartment', '');
    };

    return (
        <div className="flex flex-wrap w-full mt-5 gap-3 sm:gap-5">
            <FormChooseCity
                name="ukrPostCity"
                className="text-base w-full sm:w-1/2"
                placeholder="Місто/населений пункт"
                onCitySelect={handleCityChange}
            />

            <FormChooseUkrpostDepartment 
                name="ukrPostDepartment"
                disabled={!city}
                className="text-base w-full sm:w-[46%]"
                placeholder="Відділення Укрпошти"
            />
        </div>
    );
};

export default UkrPostInputs;
