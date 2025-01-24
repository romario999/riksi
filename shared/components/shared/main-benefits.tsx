import React from 'react';

export const MainBenefits = () => {
  return (
    <section className="flex flex-wrap justify-between bg-gray-200 mt-5 w-full px-4 sm:px-6 md:px-12 lg:px-24 py-6">
      <div className="flex items-center mb-6 sm:mb-0 w-full sm:w-auto sm:flex-col">
        <img src="https://riksi.ua/content/images/6/160x160l80nn0/87403972850890.webp" className="w-[80px]" alt="sewing" />
        <h4 className="text-[16px] font-bold text-center mt-2">Індивідуальне пошиття</h4>
      </div>

      <div className="flex items-center mb-6 sm:mb-0 w-full sm:w-auto sm:flex-col">
        <img src="https://riksi.ua/content/images/5/160x160l80nn0/84884447888615.webp" className="w-[80px]" alt="sewing" />
        <h4 className="text-[16px] font-bold text-center mt-2">Гарантія</h4>
      </div>

      <div className="flex items-center mb-6 sm:mb-0 w-full sm:w-auto sm:flex-col">
        <img src="https://riksi.ua/content/images/3/160x160l80nn0/93204391045616.webp" className="w-[80px]" alt="sewing" />
        <h4 className="text-[16px] font-bold text-center mt-2">Обмін та повернення</h4>
      </div>

      <div className="flex items-center mb-6 sm:mb-0 w-full sm:w-auto sm:flex-col">
        <img src="https://riksi.ua/content/images/2/160x160l80nn0/95557210541010.webp" className="w-[80px]" alt="sewing" />
        <h4 className="text-[16px] font-bold text-center mt-2">Оплата при отриманні</h4>
      </div>

      <div className="flex items-center mb-6 sm:mb-0 w-full sm:w-auto sm:flex-col">
        <img src="https://riksi.ua/content/images/4/160x160l80nn0/78640970201040.webp" className="w-[80px]" alt="sewing" />
        <h4 className="text-[16px] font-bold text-center mt-2">Міжнародна доставка</h4>
      </div>
    </section>
  );
};
