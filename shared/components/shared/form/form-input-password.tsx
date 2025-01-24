'use client';

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { EyeIcon, EyeOff } from "lucide-react";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInputPassword: React.FC<Props> = ({ className, name, label, required, ...props }) => {

    const [showPassword, setShowPassword] = React.useState(true);

    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();
    
    const value = watch(name);
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
                <Input type={showPassword ? 'password' : 'text'} className="h-12 text-md" {...register(name)} {...props} />
                {value ? (!showPassword ? <span className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer"><EyeIcon onClick={() => setShowPassword(!showPassword)} /></span> : <span className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer"><EyeOff onClick={() => setShowPassword(!showPassword)} /></span>) : null}
                {value && <ClearButton onClick={onClickClear} />}
            </div>

           {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    )
}