"use client";

import { useState } from 'react';
import { FaComments, FaInstagram, FaViber, FaTelegramPlane } from 'react-icons/fa';

export const SocialLinks = () => {
  const [show, setShow] = useState(false);

  const socialMediaLinks = [
    { name: 'Instagram', icon: <FaInstagram />, link: 'https://instagram.com/riksi_ua/', color: 'bg-[#e131b2]' },
    { name: 'Viber', icon: <FaViber />, link: 'viber://add?number=380932478447', color: 'bg-[#8a5897]' },
    { name: 'Telegram', icon: <FaTelegramPlane />, link: 'https://telegram.me/riksi_ua', color: 'bg-[#50a2dd]' },
  ];

  return (
    <div className="fixed bottom-5 right-5">
      <div
        className="w-12 h-12 rounded-full bg-black flex justify-center items-center cursor-pointer border-2"
        onClick={() => setShow(!show)}
      >
        <FaComments className="text-white text-2xl" />
      </div>
      <div className={`absolute bottom-20 right-1 flex flex-col items-end pointer-events-none transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
        {socialMediaLinks.map((socialMedia) => (
          <div key={socialMedia.name} className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mt-2 ${socialMedia.color}`}>
            <a href={socialMedia.link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex justify-center items-center text-white text-lg">
              {socialMedia.icon}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};