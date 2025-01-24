'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown, BookHeart, ChevronsDown, ChevronsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Props {
  className?: string;
  onSortChange?: (sortOption: string) => void;
  selected: string;
  onChangeSort: (sortOption: string) => void;
}

export const SortPopup: React.FC<Props> = ({ className, selected, onChangeSort }) => {
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>(selected || 'popular');

  useEffect(() => {
    const sortBy = searchParams.get('sortBy') || 'popular';
    setSelectedSort(sortBy);
  }, [searchParams]);

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    onChangeSort(sortOption); 
  };

  return (
    <div className='mb-5 w-[310px]'>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'inline-flex select-none items-center gap-1 bg-gray-50 px-5 h-[52px] max-w-[290px] rounded-2xl cursor-pointer',
            className
          )}
        >
          <ArrowUpDown size={16} />
          Сортування:
          <b className="text-primary ml-1">{selectedSort === 'popular' ? 'популярне' : selectedSort === 'asc' ? 'від меншої ціни' : 'від більшої ціни'}</b>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            'bg-white shadow-md rounded-lg p-2 min-w-[245px] max-w-[290px]'
          )}
        >
          <DropdownMenuItem
            onClick={() => handleSortChange('popular')}
            className="cursor-pointer text-[15px]"
          >
            <BookHeart /> Популярне
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortChange('asc')}
            className="cursor-pointer text-[15px]"
          >
            <ChevronsDown /> Від меншої ціни
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortChange('desc')}
            className="cursor-pointer text-[15px]"
          >
            <ChevronsUp /> Від більшої ціни
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
