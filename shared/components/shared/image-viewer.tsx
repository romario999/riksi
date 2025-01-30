import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface ImageViewerProps {
  images: string[]; // Масив зображень
  activeIndex: number; // Поточний індекс активного зображення
  onClose: () => void; // Функція для закриття вьювера
  productName: string;
  onChangeImage: (index: number) => void; // Функція для зміни зображення
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  activeIndex,
  onClose,
  productName,
  onChangeImage,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // Стан для анімації відкриття
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Заборона прокручування
    setFadeIn(true); // Активуємо анімацію при відкритті

    return () => {
      document.body.style.overflow = ""; // Відновлення прокручування при закритті
    };
  }, []);

  const handleImageClick = () => {
    setZoomed(!zoomed); // Зміна стану зуму при кліку
  };

  const nextImage = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    onChangeImage(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    onChangeImage(prevIndex);
  };

  const handleClose = () => {
    setFadeIn(false); // Активуємо анімацію закриття
    setTimeout(onClose, 300); // Закриваємо компонент після завершення анімації
  };

  return (
    <div
      ref={viewerRef}
      className={`fixed inset-0 bg-white flex flex-col justify-center items-center z-[9999] transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="p-3 text-black text-xl flex text-left w-full">{productName}</div>
      <hr className="w-full border-t-[1px] border-gray-600" />
      <button
        onClick={handleClose}
        className="absolute top-2 right-4 text-black text-2xl z-[10000]" // Задаємо вищий z-index для кнопки
      >
        ✕
      </button>
      <div className="p-3 relative w-full h-full flex justify-center items-center overflow-auto">
        <button
          onClick={prevImage}
          className="absolute left-4 text-black text-3xl z-[10000]"
        >
          <ArrowLeft size={32} />
        </button>
        <img
          src={images[activeIndex]}
          alt="Selected"
          onClick={handleImageClick} // Зміна зуму при кліку
          className={`max-w-full max-h-full object-contain rounded transition-transform duration-300 ease-out cursor-zoom-in ${zoomed ? 'scale-150' : ''}`} // Додаємо зум
        />
        <button
          onClick={nextImage}
          className="absolute right-4 text-black text-3xl z-[10000]"
        >
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
};
