import React from 'react';
import { Button } from '../ui';
import { Heart } from 'lucide-react';;
import { useSession } from 'next-auth/react';

interface LikeButtonProps {
  count?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ count = 0 }) => {
  const session = useSession().data?.user;
  const isDisabled = session?.id ? false : true;
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative p-2 hover:bg-gray-50 transition-colors hidden md:block disabled:bg-white"
      aria-label="Like"
      disabled={isDisabled}
    >
      <Heart size={22} className="text-gray-900 hover:text-black transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Button>
  );
};

export default LikeButton;
