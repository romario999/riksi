'use client';

import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface QueryFilters extends PriceProps {
    color: string;
    categories: string;
    subcategories: string;
    size: string;
    sortBy: string;
}

export interface Filters {
    color: Set<string>;
    size: Set<string>;
    sortBy: string;
    selectedCategories: Set<string>;
    selectedSubcategories: Set<string>;
    prices: PriceProps;
    
}

export interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setColor: (value: string) => void;
    setSize: (value: string) => void;
    setCategories: (value: string) => void;
    setSortBy: (value: string) => void;
    setSubcategories: (value: string) => void;
    clearFilters: () => void;
    //setPage: (value: number) => void;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number; 
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    /* Фільтр категорії */
    const [selectedCategories, {toggle: toggleCategories, clear: clearCategories}] = useSet(new Set<string>(searchParams.has('categories') ? searchParams.get('categories')?.split(',') : []));
 
    /* Фільтр субкатегорії */
    const [selectedSubcategories, {toggle: toggleSubcategories, clear: clearSubcategories}] = useSet(new Set<string>(searchParams.has('subcategories') ? searchParams.get('subcategories')?.split(',') : []));

    /* Фільтр кольорів */
    const [color, { toggle: toggleColor, clear: clearColor }] = useSet(new Set<string>(searchParams.has('color') ? searchParams.get('color')?.split(',') : []));

    /* Фільтр розмірів */
    const [size, { toggle: toggleSize, clear: clearSize }] = useSet(new Set<string>(searchParams.has('size') ? searchParams.get('size')?.split(',') : []));

    /* Фільтр сортування */
    const [sortBy, setSortBy] = React.useState<string>(searchParams.get('sortBy') || 'popular');
    const toggleSortBy = (value: string) => {
        setSortBy(prevSortBy => (prevSortBy === value ? 'popular' : value));
    }; 

    /* Фільтр ціни */
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const clearFilters = () => {
        clearCategories();
        clearSubcategories();
        clearColor();
        clearSize();
        setPrices({
            priceFrom: 0,
            priceTo: 5000,
        });
        setSortBy('popular');
    };

    return React.useMemo(
        () => ({
            color,
            size,
            sortBy,
            selectedCategories,
            selectedSubcategories,
            prices,
            setSubcategories: toggleSubcategories,
            setSortBy: toggleSortBy,
            setPrices: updatePrice,
            setColor: toggleColor,
            setCategories: toggleCategories,
            setSize: toggleSize,
            clearFilters,
        }),
        [color, selectedCategories, prices, size, sortBy, selectedSubcategories]
    );
}
