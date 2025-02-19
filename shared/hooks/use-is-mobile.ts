import { useState, useEffect } from 'react';

export const useIsMobile = (threshold: number = 784) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < threshold);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < threshold);
    };

    // Додаємо слухач на подію зміни розміру
    window.addEventListener('resize', handleResize);

    // Викликаємо одразу при завантаженні
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [threshold]);

  return isMobile;
};
