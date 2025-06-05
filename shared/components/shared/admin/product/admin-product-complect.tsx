'use client';

import { Product, ProductComplect } from "@prisma/client";
import { Button } from "../../../ui";
import { AdminSearchInputComplects } from "./admin-search-input-complects";
import React from "react";
import { Trash2Icon } from "lucide-react";

interface Props {
    complects: any;
    setComplects: React.Dispatch<React.SetStateAction<ProductComplect[]>>;
    product: Product;
}

export const AdminProductComplect: React.FC<Props> = ({complects, setComplects, product}) => {

    const [showInput, setShowInput] = React.useState(false);

    const handleDeleteComplect = (productId: number) => {
        setComplects((prevComplects: any[]) =>
            prevComplects.map((complect) => ({
                ...complect,
                products: complect.products.filter((prod: { id: number; }) => prod.id !== productId),
            }))
        );
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Комплект</label>
            <Button variant="outline" className="block my-5 w-[250px]" onClick={() => setShowInput(!showInput)}>Додати комплект</Button>
            <AdminSearchInputComplects originalProduct={product} className={`w-[550px] ${showInput ? '' : 'hidden'}`} complects={complects} setComplects={setComplects} />
            {complects.length < 1 ? (
                <div className="mt-4">Товар не має комплектів</div>
            ) : (
                    complects.map((complect: { id: number; products: Product[]; }, i: number) => (
                        <div key={i} className="mt-4 rounded-md p-4 inline-block bg-gray-100">
                            <div className="flex gap-5">
                            {complect.products.map((prod) => (
                                <div key={prod.id} className="flex w-[180px] rounded-lg p-3">
                                    <div>
                                        <img
                                            src={prod.imageUrl[0]}
                                            alt={prod.name}
                                            className="w-32 rounded-md mb-2"
                                        />
                                        <h3 className="font-semibold text-base">{prod.name}</h3>
                                        <div className="mt-2 font-bold">
                                            {prod.price}₴
                                        </div>
                                    </div>

                                    <div>
                                        <span className="cursor-pointer" onClick={() => handleDeleteComplect(prod.id)}><Trash2Icon size={20} /></span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                ))
            )}
        </div>
    )
}