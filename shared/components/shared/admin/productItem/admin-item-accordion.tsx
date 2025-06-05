'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../ui/accordion";
import { Button } from "../../../ui";
import React from "react";
import { AddProductItem, AdminAddProductItem } from "./admin-add-product-item";
import { AdminViewProductItem } from "./admin-view-product-item";


export type AdminItemProduct = {
    sku: string;
    price: number;
    oldPrice: number | null;
    size: string;
    stock: boolean;
}

interface Props {
    productItems: AddProductItem[];
    productId?: number | null;
    setAddProductItems: React.Dispatch<React.SetStateAction<any[]>>
}

export const AdminItemAccordion: React.FC<Props> = ({ productItems, productId, setAddProductItems }) => {

    const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

    return (
        <div>
            <div className="my-4 flex justify-end">
                <Button onClick={() => setIsFormVisible(!isFormVisible)}>{isFormVisible ? 'Закрити' : 'Додати варіацію'}</Button>
            </div>

            {isFormVisible && (
                <AdminAddProductItem items={productItems} productId={productItems[0]?.productId ?? productId} setItems={setAddProductItems} setIsFormVisible={setIsFormVisible} />
            )}

            <Accordion type="single" collapsible>
                {productItems.sort((a, b) => Number(a.id) - Number(b.id)).map((item, i) => (
                    <AccordionItem key={i} value={item.sku}>
                        <AccordionTrigger>{item.sku}</AccordionTrigger>
                        <AccordionContent>
                            <AdminViewProductItem items={productItems} item={item} setItems={setAddProductItems} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

