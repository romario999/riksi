import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selected?: Set<string>;
    selectedCategories?: Set<string>;
    selectedSubcategories?: Set<string>;
    className?: string;
    name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 6,
        searchInputPlaceholder = "Пошук...",
        className,
        loading,
        onClickCheckbox,
        selectedCategories,
        selectedSubcategories,
        name,
        selected,
        defaultValue
    }
) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const handleCheckboxClick = (item: Item) => {
        const isSubcategory = item.isSubcategory;
        const categoryId = item.isSubcategory ? item.categoryId : item.value;

        if (isSubcategory && selectedCategories?.has(`cat-${categoryId}`)) {
            return;
        }

        onClickCheckbox?.(String(item.value));
    };

    if (loading) {
        return <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {
                ...Array(limit).fill(0).map((_, index) => (
                    <Skeleton key={index} className='h-6 mb-4 rounded-[8px] bg-gray-200' />
                ))
            }
            <Skeleton className='h-6 w-28 mb-4 rounded-[8px] bg-gray-200' />
        </div>
    }
    
    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : (defaultItems || items).slice(0, limit);

    return (
      <div className={className}>
          <p className="font-bold mb-3">{title}</p>
          {
              showAll && <div className="mb-5">
              <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
          </div>
          }
          <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
              {list.map((item, index) => (
                    <FilterCheckbox 
                      checked={selected?.has(item.value)}
                      key={index}
                      value={item.value}
                      text={item.text}
                      endAdornment={item.endAdornment}
                      onCheckedChange={() => handleCheckboxClick(item)}
                      name={name}
                      isSubcategory={item.isSubcategory}
                    />
              ))}
          </div>
          {items.length > limit && (
              <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                  <button onClick={() => {
                        setShowAll(!showAll);
                        setSearchValue('');
                    }} className='text-primary mt-3 font-bold'>{showAll ? 'Приховати' : '+ Показати все'}</button>
              </div>
          )}
      </div>
    );
};
