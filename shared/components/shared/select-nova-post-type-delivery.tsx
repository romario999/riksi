import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/shared/lib/utils';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from './error-text';

interface Props {
    className?: string;
    disabled?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
}

const SelectNovaPostTypeDelivery: React.FC<Props> = ({ className, disabled, value, onValueChange}) => {
    const {
        register,
        setValue,
        clearErrors,
        watch,
        formState: { errors },
    } = useFormContext();

    const errorText = errors['novaPostTypeDelivery']?.message as string;

    const handleDeliveryTypeChange = (value: string) => {
        onValueChange?.(value);
        setValue('novaPostTypeDelivery', value);
        clearErrors('novaPostTypeDelivery');
    };

  return (
            <div className={cn('', className)}>
                <input type="hidden" {...register('novaPostTypeDelivery')} />
                <Select value={value || ''} onValueChange={handleDeliveryTypeChange} disabled={disabled}>
                    <SelectTrigger className={cn("h-12 text-md text-foreground", disabled && "opacity-50 cursor-not-allowed")}>
                        <SelectValue placeholder="Оберіть тип доставки" />
                    </SelectTrigger>
                    <SelectContent className="w-[93%]">
                        <SelectItem 
                            value="department" 
                            className={cn('text-base', disabled && "opacity-50 cursor-not-allowed")}
                            disabled={disabled}
                        >
                            Відділення/поштомат Нової Пошти
                        </SelectItem>
                        <SelectItem 
                            value="courier" 
                            className={cn('text-base', disabled && "opacity-50 cursor-not-allowed")}
                            disabled={disabled}
                        >
                            Курʼєром Нової Пошти
                        </SelectItem>
                    </SelectContent>
                </Select>
                {errorText && <ErrorText text={errorText} className="mt-2" />}
            </div>
  );
};

export default SelectNovaPostTypeDelivery;
