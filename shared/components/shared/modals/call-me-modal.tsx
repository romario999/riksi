import { Dialog } from '@/shared/components/ui/dialog';
import { DialogContent } from '@/shared/components/ui/dialog';
import { Title } from '../title';
import { FormInput } from '../form';
import { FormProvider, useForm } from 'react-hook-form';
import { callMeSchema, TFormCallMeValues } from './auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormChoosePhoneNumber } from '../form/form-choose-phone-number';
import { Button } from '../../ui';
import toast from 'react-hot-toast';
import { callMe } from '@/app/actions';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const CallMeModal: React.FC<Props> = ({open, onClose}) => {
    const form = useForm<TFormCallMeValues>({
        resolver: zodResolver(callMeSchema),
        defaultValues: {
            callMeName: '',
            callMePhone: '',
        },
    });

    const onSubmit = async (data: TFormCallMeValues) => {
        try {
            await callMe(data);
            onClose();
            toast.success('Запит прийнято! Очікуйте на дзвінок від оператора', {
                icon: '✅',
            });
        } catch (e) {
            console.error('[ERROR CallMe]', e);
            toast.error('Виникла помилка, спробуйте пізніше', {
                icon: '❌',
            })
        }
    }

  return (
    <FormProvider {...form}>
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white flex flex-col justify-center">
                <Title size='md' className='text-center' text={'Передзвонити вам?'} />
                <form className='flex flex-col gap-5 mt-5 justify-center mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput
                        placeholder='Ваше імʼя' 
                        name={'callMeName'} 
                        value={form.watch('callMeName')}
                        onChange={(e) => form.setValue('callMeName', e.target.value)}
                    />
                    <FormChoosePhoneNumber 
                        placeholder='Номер телефону' 
                        name={'callMePhone'} 
                        value={form.watch('callMePhone')}
                        onChange={(e) => form.setValue('callMePhone', e.target.value)}
                    />
                    <Button loading={form.formState.isSubmitting} className="h-12 mt-5 text-base flex justify-center" type="submit">
                        Надіслати
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    </FormProvider>
  );
};
