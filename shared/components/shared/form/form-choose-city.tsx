import { useFormContext } from "react-hook-form";
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
    onCitySelect?: (cityRef: any) => void;
}

export const FormChooseCity: React.FC<Props> = ({ className, name, label, required, onCitySelect, ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        clearErrors,
    } = useFormContext();

    const [query, setQuery] = React.useState('');
    const [cities, setCities] = React.useState<any[]>([]);
    const [isLocked, setIsLocked] = React.useState(false); // Стан для блокування введення

    // Використовуємо useDebounce для API-запитів
    useDebounce(
        async () => {
            if (query.length > 2 && !isLocked) {
                try {
                    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                        apiKey: process.env.NOVAPOSHTA_API_KEY,
                        modelName: 'AddressGeneral',
                        calledMethod: 'searchSettlements',
                        methodProperties: {
                            CityName: query,
                            Limit: 5,
                        },
                    });
                    setCities(response.data.data[0]?.Addresses || []);
                } catch (error) {
                    console.error(error);
                    setCities([]);
                }
            } else {
                setCities([]);
            }
        },
        700, // Затримка у 300 мс
        [query]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isLocked) return; // Забороняємо зміну, якщо поле заблоковане
        setQuery(e.target.value);
        clearErrors(name);
    };

    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '');
        setQuery('');
        setCities([]);
        setIsLocked(false); // Розблоковуємо введення після очищення
        setValue('idCity', '');
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
                    readOnly={isLocked} // Робимо поле readOnly, якщо воно заблоковане
                    className="h-12 text-md pr-10"
                    {...props}
                />

                {query && <ClearButton onClick={onClickClear} />}

                {cities.length > 0 && (
                    <ul className="border border-gray-300 mt-[1px] p-1 list-none rounded-md">
                        {cities.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setValue(name, String(city.Present)); // Оновлюємо значення у формі
                                    setQuery(city.Present);
                                    setCities([]);
                                    setIsLocked(true); // Блокуємо введення після вибору міста
                                    onCitySelect?.(city);
                                    setValue('idCity', city.Ref);
                                }}
                                className={cn(
                                    'cursor-pointer py-2 pl-2 hover:bg-gray-100',
                                    {
                                        'border-b border-gray-300': cities.length > 1 && index !== cities.length - 1,
                                    }
                                )}
                            >
                                {city.Present}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
