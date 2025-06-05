import { FormProvider, useForm } from "react-hook-form";
import { adminFormProductItemSchema } from "@/shared/constants/admin-form-productItem-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ErrorText } from "../../error-text";
import { Button } from "@/shared/components/ui";

export type AddProductItem = {
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
    sku: string,
    price: number,
    currency: string,
    productId: number,
    oldPrice: number | null,
    size: string,
    stock: boolean
}

interface Props {
    items: AddProductItem[]
    setItems: React.Dispatch<React.SetStateAction<AddProductItem[]>>
    productId: number
    setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminAddProductItem: React.FC<Props> = ({items, setItems, productId, setIsFormVisible}) => {

        const form = useForm<adminFormProductItemSchema>({
            resolver: zodResolver(adminFormProductItemSchema),
            defaultValues: {
                itemPrice: undefined,
                itemOldPrice: undefined,
                itemSku: undefined,
                itemSize: undefined,
            }
        });

        const {
            register,
            formState: { errors },
            setValue
        } = form;

    const onSubmit = async (data: adminFormProductItemSchema) => {
        try {
            const newItem = {
                sku: data.itemSku,
                price: Number(data.itemPrice),
                currency: 'UAH',
                productId: productId,
                oldPrice: Number(data.itemOldPrice) || null,
                size: data.itemSize,
                stock: data.itemStock === 'true' ? true : false,
            };
    
            setItems([...items, newItem]);
            setIsFormVisible(false);
    
            toast.success('Варіацію успішно додано');
        } catch (error) {
            toast.error('Виникла помилка, спробуйте пізніше');
            console.error('Error [ADD_ADMIN_PRODUCT_ITEM]', error);
            throw error;
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4 p-4 border border-gray-300 rounded-md">
                    <div className="mb-4">
                        <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700">
                            Ціна
                        </label>
                        <input
                            type="number"
                            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                            {...register('itemPrice')}
                        />
                        {errors.itemPrice && <ErrorText text={errors.itemPrice.message as string} className="mt-2" />}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="itemOldPrice" className="block text-sm font-medium text-gray-700">
                            Стара ціна
                        </label>
                        <input
                            type="number"
                            {...register('itemOldPrice')}
                            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                            Артикул
                        </label>
                        <input
                            type="text"
                            {...register('itemSku')}
                            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.itemSku && <ErrorText text={errors.itemSku.message as string} className="mt-2" />}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                            Розмір
                        </label>
                        <input
                            type="text"
                            {...register('itemSize')}
                            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.itemSize && <ErrorText text={errors.itemSize.message as string} className="mt-2" />}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Наявність
                        </label>
                        <select
                            id="stock"
                            {...register('itemStock')}
                            onChange={(e) => setValue('itemStock', e.target.value)}
                            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="true">В наявності</option>
                            <option value="false">Немає в наявності</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <Button>Додати</Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}