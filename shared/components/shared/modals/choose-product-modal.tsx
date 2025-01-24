'use client';

import { Dialog } from '@/shared/components/ui';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { DialogContent } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
    product: ProductWithRelations;
    className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] max-h-[700px] min-h-[550px] bg-white overflow-hidden overflow-auto scrollbar', className)}>
          <ProductForm product={product} onSubmit={() => router.back()} />
        </DialogContent>
    </Dialog>
  );
};
