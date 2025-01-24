'use client';

import React from "react";
import { Filters } from "./use-filters";
import qs from 'qs';
import { useRouter } from "next/navigation";
import { useDeepCompareEffect } from "react-use";


export const useQueryFilters = async (filters: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();
    useDeepCompareEffect(() => {
        if(isMounted.current) {
            const params = {
                ...filters.prices,
                color: Array.from(filters.color),
                categories: Array.from(filters.selectedCategories),
                subcategories: Array.from(filters.selectedSubcategories),
                sortBy: Array.from(filters.sortBy).join(''),
            };
            
            const query = qs.stringify(params, {
                arrayFormat: 'comma',
            });
    
            router.push(`?${query}`, {
                scroll: false
            });
        }

        isMounted.current = true;
    }, [filters]);
}