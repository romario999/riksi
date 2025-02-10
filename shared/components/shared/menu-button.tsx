import React from "react";

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <button className="relative group bg-transparent text-black hover:text-white focus:text-white">
        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all hover:scale-110 duration-200">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div
              className={`bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${
                isOpen ? "rotate-[42deg]" : ""
              }`}
            />
            <div
              className={`bg-black h-[2px] w-1/2 rounded transform transition-all duration-300 ${
                isOpen ? "-translate-x-10" : ""
              }`}
            />
            <div
              className={`bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${
                isOpen ? "-rotate-[42deg]" : ""
              }`}
            />
          </div>
        </div>
      </button>
    </div>
  );
};
