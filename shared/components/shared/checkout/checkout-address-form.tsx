'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import NovaPoshtaInputs from '../nova-poshta-inputs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';
import UkrPostInputs from '../ukr-post-inputs';

interface Props {
  className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
  const [deliveryType, setDeliveryType] = React.useState<string | undefined>(undefined);

  const {
    register,
    setValue,
    clearErrors, // Очищення помилок
    formState: { errors },
  } = useFormContext();

  const errorText = errors['deliveryType']?.message as string;

  const handleDeliveryTypeChange = (value: string) => {
    setDeliveryType(value);
    setValue('deliveryType', value);
    setValue('novaPostCity', '');
    setValue('idCity', '');
    setValue('idDepartment', '');
    clearErrors('deliveryType'); // Очищаємо помилку при виборі
  };

  React.useEffect(() => {
    if (deliveryType === 'nova-post') {
      setValue('ukrPostCity', '');
      setValue('ukrPostDepartment', '');
      setValue('street', '');
      setValue('numberStreet', '');
    } else if (deliveryType === 'ukr-post') {
      setValue('novaPostTypeDelivery', '');
      setValue('novaPostDepartment', '');
      setValue('novaPostCity', '');
      setValue('street', '');
      setValue('numberStreet', '');
    }
  }, [deliveryType, setValue]);

  return (
    <WhiteBlock title="3. Доставка" className={className}>
      <div className="flex flex-col">
        <input type="hidden" {...register('deliveryType')} />

        <Select value={deliveryType} onValueChange={handleDeliveryTypeChange}>
          <SelectTrigger className="sm:w-1/2 w-[70%] h-12 text-md text-foreground">
            <SelectValue placeholder="Оберіть спосіб доставки" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nova-post" className="text-base">
              <div className="flex">
                <img
                  src="/assets/images/nova-post-logo.svg"
                  alt="Лого Нова Пошта"
                  className="w-5 h-5 mr-2"
                />
                <div>Нова пошта</div>
              </div>
            </SelectItem>
            <SelectItem value="ukr-post" className="text-base">
              <div className="flex">
                <img
                  src="/assets/images/ukrpost-logo.svg"
                  alt="Лого Нова Пошта"
                  className="w-5 h-5 mr-2"
                />
                <div>Укрпошта</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {errorText && <ErrorText text={errorText} className="mt-2" />}

        {deliveryType === 'nova-post' && <NovaPoshtaInputs />}
        {deliveryType === 'ukr-post' && <UkrPostInputs />}
      </div>
    </WhiteBlock>
  );
};
