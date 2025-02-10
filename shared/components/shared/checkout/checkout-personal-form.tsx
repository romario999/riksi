'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form';
import { Checkbox } from '../../ui';  // імпортуємо кастомний чекбокс
import { useFormContext } from 'react-hook-form';
import { FormChoosePhoneNumber } from '../form/form-choose-phone-number';

interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  // Отримуємо поточне значення для dontCall
  const dontCall = watch('dontCall');
  const otherRecipient = watch('otherRecipient');

  React.useEffect(() => {
    setValue('fullNameRecipient', '');
    setValue('phoneNumberRecipient', '');
  }, [otherRecipient])

  return (
    <WhiteBlock title="2. Персональна інформація" className={className}>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="min-w-[30%]">
            <FormInput name="firstName" className="text-base" placeholder="Імʼя" />
          </div>
          <div className="min-w-[30%]">
            <FormInput name="lastName" className="text-base" placeholder="Прізвище" />
          </div>
          <div className="min-w-[30%]">
            <FormInput name="email" className="text-base" placeholder="E-mail" />
          </div>
          <div className="min-w-[30%]">
            <FormChoosePhoneNumber name="phone" required />
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                {...register("dontCall")} // Реєстрація кастомного чекбокса для dontCall
                checked={dontCall} // Підключення до значення don'tCall у формі
                onCheckedChange={(checked) => setValue('dontCall', checked)} // Обробка зміни стану
                className="rounded-[8px] w-5 h-5" // Зберігаємо стилі
              />
              <label className="leading-none text-sm flex-1">
                Не телефонувати для підтвердження замовлення
              </label>
            </div>
          </div>
        </div>
        <FormTextarea
          name="comment"
          className="text-base"
          rows={5}
          placeholder="Коментарі до замовлення"
        />
        <div className="flex items-center space-x-2 mt-3">
          <Checkbox
            {...register("otherRecipient")} 
            checked={otherRecipient}
            onCheckedChange={(checked) => setValue('otherRecipient', checked)}
            className="rounded-[8px] w-5 h-5"
          />
          <label className="leading-none text-sm flex-1">
            Інший отримувач
          </label>
        </div>
        {otherRecipient && (
          <div className='grid mt-2 grid-cols-1 md:grid-cols-2 gap-5'>
            <div className="min-w-[30%]">
              <FormInput name="fullNameRecipient" className="text-base" placeholder="Повне ім'я" />
            </div>
            <div className="min-w-[30%]">
              <FormInput name="phoneNumberRecipient" className="text-base" placeholder="Номер телефону" />
            </div>
          </div>
        )}
        </div>
    </WhiteBlock>
  );
};
