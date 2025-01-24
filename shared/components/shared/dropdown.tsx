'use client';

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { useCategories } from "@/shared/hooks";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface Category {
  name: string;
  id: number;
  categoryUrl: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  subcategories?: Subcategory[];
}

interface Subcategory {
  categoryId: number;
  subcategoryUrl: string;
  description: string | null;
  name: string;
  id: number;
  link: string;
}

export const DropdownMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { categories } = useCategories();
  const [visible, setVisible] = useState(isOpen);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);  // Додаємо стан для перевірки сенсорного екрану
  const enterTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const leaveTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    // Перевірка, чи є сенсорний екран
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleMouseEnter = useCallback((value: string) => {
    if (leaveTimers.current[value]) {
      clearTimeout(leaveTimers.current[value]);
    }

    enterTimers.current[value] = setTimeout(() => {
      setOpenItems((prev) => [...prev, value]);
    }, 300); // Затримка на 300 мс перед відкриттям
  }, []);

  const handleMouseLeave = useCallback((value: string) => {
    if (enterTimers.current[value]) {
      clearTimeout(enterTimers.current[value]);
    }

    leaveTimers.current[value] = setTimeout(() => {
      setOpenItems((prev) => prev.filter((item) => item !== value));
    }, 200); // Затримка на 200 мс перед закриттям
  }, []);

  const handleClick = useCallback((value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  }, []);

  return (
    <div className="relative">
  <div className={`right-0 bg-white shadow-none sm:shadow-lg mt-0 pb-10 rounded-b-lg min-h-[400px] w-full max-h-full overflow-y-auto`}>
    {visible && (
      <Accordion type="multiple" value={openItems}>
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-9 w-[90%] mx-auto">
            {categories.sort((a, b) => a.id - b.id).map((category: Category) => (
              category.subcategories && category.subcategories.length > 0 ? (
                <AccordionItem
                  key={category.id}
                  value={category.id.toString()}
                  className="border-none"
                  onMouseEnter={!isTouchDevice ? () => handleMouseEnter(category.id.toString()) : undefined}
                  onMouseLeave={!isTouchDevice ? () => handleMouseLeave(category.id.toString()) : undefined}
                  onClick={isTouchDevice ? () => handleClick(category.id.toString()) : undefined}
                >
                  {isTouchDevice ? (
                    <AccordionTrigger
                      className="flex justify-between items-center px-4 py-2 text-gray-800 text-xl w-full"
                    >
                      {category.name}
                    </AccordionTrigger>
                  ) : (
                    <Link href={`/catalog/${category.categoryUrl}`} onClick={onClose}>
                      <AccordionTrigger
                        className="flex justify-between items-center px-4 py-2 text-gray-800 text-xl w-full"
                      >
                        {category.name}
                      </AccordionTrigger>
                    </Link>
                  )}
                  <AccordionContent>
                    {isTouchDevice && (
                      <div className="mt-4 text-center flex flex-col items-center mb-2">
                        <Link href={`/catalog/${category.categoryUrl}`} onClick={onClose} className="font-bold">
                          <div className="flex items-center">
                            {category.name} <ChevronRight className="ml-1" />
                          </div>
                        </Link>
                      </div>
                    )}
                    <div
                      className={`ml-4 gap-1 ${
                        category.subcategories.length > 3 ? "grid grid-cols-2" : "flex flex-col"
                      }`}
                    >
                      {category.subcategories.map(subcategory => (
                        <Link 
                          key={subcategory.id} 
                          href={`/catalog/${category.categoryUrl}/${subcategory.subcategoryUrl}`} 
                          onClick={onClose} 
                          className="hover:underline py-1 px-2 text-sm sm:text-base"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <li
                  key={category.id}
                  className="flex justify-between px-4 py-2 text-gray-800 text-xl w-full border-none hover:underline cursor-pointer"
                >
                  <Link href={`/catalog/${category.categoryUrl}`} onClick={onClose} className="hover:underline">
                    {category.name}
                  </Link>
                </li>
              )
            ))}
            <li className="flex justify-between px-4 py-2 text-gray-800 text-xl w-full border-none hover:underline cursor-pointer">
              <Link href="/catalog" onClick={onClose}>
                Всі товари
              </Link>
            </li>
          </ul>
        </div>
      </Accordion>
    )}
  </div>
</div>

  );
};
