'use client';
import React, { useState, useEffect } from 'react';
import { Title } from './title';
import { Button, Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFilterGroup } from './checkbox-filter-group';
import { useQueryFilters, useFilters, useCategories } from '@/shared/hooks';
import { SortPopup } from './sort-popup';
import { cn } from '@/shared/lib/utils';
import { FilterX } from 'lucide-react';
import { useDebounce } from 'react-use';

interface Props {
  className?: string;
  isCatalog?: boolean;
  isCategory?: boolean;
  isSubcategory?: boolean;
  categoryId?: string | null
  subcategoryId?: string;
  hasSubcategory?: boolean;
  categoryName?: string;
  loading?: boolean;
  onFilterChange: () => void;
}

type Items = {
  value: string;
  text: string;
  isSubcategory?: boolean;
  categoryId?: string;
}

export const Filters: React.FC<Props> = ({ className, isCatalog, isCategory, isSubcategory, categoryId, subcategoryId, hasSubcategory, categoryName, onFilterChange }) => {
  const { categories, subcategories, loading } = useCategories();
 
  const filters = useFilters();
  useQueryFilters(filters);

  const handleFilterChange = () => {
    // Ваш код для зміни фільтрів, наприклад:
    onFilterChange();  // Викликаємо функцію для зміни стану в батьківському компоненті
  };

  let items: Items[] = [];

  if (isCatalog) {
    const cats = categories.sort((a, b) => a.id - b.id).map((item) => ({
      value: `cat-${item.id}`,
      text: item.name,
      isSubcategory: false
    }));

    const subcatFrequency = new Map();
    subcategories.forEach((item) => {
      if (subcatFrequency.has(item.name)) {
        subcatFrequency.set(item.name, subcatFrequency.get(item.name) + 1);
      } else {
        subcatFrequency.set(item.name, 1);
      }
    });

    const modifiedSubcats = subcategories.sort((a, b) => a.id - b.id).map((item) => {
      let text = item.name;
      if (subcatFrequency.get(item.name) > 1) {
        const category = categories.find((cat) => cat.id === item.categoryId);
        if (category) {
          text = `${item.name} (${category.name})`;
        }
      }
      return {
        value: `subcat-${item.id}`,
        text,
        isSubcategory: true,
        categoryId: String(item.categoryId)
      };
    });

    items = [...cats, ...modifiedSubcats];
  }

  if (isCategory) {
    const subcats = subcategories.filter((item) => item.categoryId === Number(categoryId)).sort((a, b) => a.id - b.id).map((item) => ({
      value: `subcat-${item.id}`,
      text: item.name,
      isSubcategory: true,
      categoryId: String(item.categoryId),
    }));

    if (subcats.length === 0) {
      const subcategory = categories.find((item) => item.id === Number(categoryId));
      if (subcategory) {
        subcats.push({
          value: `cat-${subcategory.id}`,
          text: subcategory.name,
          isSubcategory: false,
          categoryId: String(subcategory.id),
        });
      }
    }

    if (hasSubcategory) {
      const subcategory = subcategories.find((item) => item.name == categoryName);
      if (subcategory) {
        // Знайти категорію за ID підкатегорії
        const category = categories.find((cat) => cat.id === subcategory.categoryId);
        
        if (category) {
          subcats.push({
            value: `subcat-${subcategory.id}`,
            text: `${subcategory.name} (${category.name})`,
            isSubcategory: false,
            categoryId: String(subcategory.id),
          });
        }
      }
    }
  
    items = [...subcats];
  }

  if (isSubcategory) {
    const subcats = subcategories.filter((item) => item.id === Number(subcategoryId)).sort((a, b) => a.id - b.id).map((item) => ({
      value: `subcat-${item.id}`,
      text: item.name,
      isSubcategory: true,
      categoryId: String(item.categoryId),
    }));
    items = [...subcats];
  }

  const [debouncedPriceFrom, setDebouncedPriceFrom] = useState(filters.prices.priceFrom || 0);
  const [debouncedPriceTo, setDebouncedPriceTo] = useState(filters.prices.priceTo || 5000);
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.prices.priceFrom || 0, filters.prices.priceTo || 5000]);

  useDebounce(
    () => {
      if (debouncedPriceFrom !== 0 || debouncedPriceTo !== 5000) {
        filters.setPrices('priceFrom', debouncedPriceFrom);
        filters.setPrices('priceTo', debouncedPriceTo);
      }
    },
    500,
    [debouncedPriceFrom, debouncedPriceTo]
  );
  
  useDebounce(
    () => {
      if (priceRange[0] !== 0 || priceRange[1] !== 5000) {
        filters.setPrices('priceFrom', priceRange[0]);
        filters.setPrices('priceTo', priceRange[1]);
        handleFilterChange();
      }
    },
    500,
    [priceRange]
  );
  

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setDebouncedPriceFrom(newRange[0]);
    setDebouncedPriceTo(newRange[1]);
  };

  const handleInputChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceRange[1]); // Ensure from <= to
    setDebouncedPriceFrom(value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleInputChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceRange[0]); // Ensure to >= from
    setDebouncedPriceTo(value);
    setPriceRange([priceRange[0], value]);
  };

  const hasActiveFilters =
    filters.selectedCategories.size > 0 ||
    filters.selectedSubcategories.size > 0 ||
    filters.color.size > 0 ||
    filters.prices.priceFrom !== undefined && filters.prices.priceFrom > 0 ||
    filters.prices.priceTo !== undefined && filters.prices.priceTo < 5000;

  const handleClearFilters = () => {
    handleFilterChange();
    filters.clearFilters();
    setDebouncedPriceFrom(0);
    setDebouncedPriceTo(5000);
    setPriceRange([0, 5000]);
    filters.setSortBy('popular');
  };

  return (
    <div className={cn('', className)}>
      {hasActiveFilters && (
        <Button className='mb-3' size="sm" onClick={handleClearFilters} variant="ghost">
          очистити фільтри <FilterX />
        </Button>
      )}
      <SortPopup 
        onChangeSort={(sortOption) => {filters.setSortBy(sortOption); handleFilterChange();}}
        selected={filters.sortBy} 
      />
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />
      <CheckboxFilterGroup
        title="Розділ"
        name="categories"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={item => {
          const [type, id] = item.split('-');
          if (type === 'subcat') {
            filters.setSubcategories(id);
          } else {
            filters.setCategories(id);
          }
          handleFilterChange();
        }}
        selected={new Set([
          ...Array.from(filters.selectedCategories).map(id => `cat-${id}`),
          ...Array.from(filters.selectedSubcategories).map(id => `subcat-${id}`)
        ])}
      />
      <hr className='mt-4' />
      <div className="mt-0 border-bottom border-bottom-neutral-100 py-4 pb-5">
        <p className="font-bold mb-3">Ціна від та до: </p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={5000}
            value={debouncedPriceFrom}
            onChange={handleInputChangeFrom}
          />
          <Input
            type="number"
            min={100}
            max={5000}
            placeholder="5000"
            value={debouncedPriceTo}
            onChange={handleInputChangeTo}
          />
        </div>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
        />
      </div>
      <hr className='mb-4' />
      {Number(categoryId) !== 9 && ( 
        <CheckboxFilterGroup
        name="color"
        className="mb-5"
        title="Колір"
        onClickCheckbox={(id) => {filters.setColor(id) ; handleFilterChange();}}
        selected={filters.color}
        items={[
          { text: 'Червоний', value: 'red' },
          { text: 'Білий', value: 'white' },
          { text: 'Чорний', value: 'black' },
          { text: 'Молочний', value: 'milk' },
          { text: 'Рожевий', value: 'pink' },
        ]}
      />)}
    </div>
  );
};