import React from 'react';
import { Button } from '../ui';
import { Heart } from 'lucide-react';;
import { useSession } from 'next-auth/react';
import { useFavorites } from '@/shared/hooks';
import Link from 'next/link';

interface LikeButtonProps {
  count?: number;
}

const LikeButton: React.FC<LikeButtonProps> = () => {
  const session = useSession().data?.user;
  const isDisabled = session?.id ? false : true;
  const {favoriteItems} = useFavorites();
  return (
   
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative p-2 hover:bg-gray-50 transition-colors hidden md:block disabled:bg-white"
        aria-label="Like"
        disabled={isDisabled}
      >
        <Link href="/wishlist" >
          <Heart size={22} className="text-gray-900 hover:text-black transition-colors" />
          {favoriteItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {favoriteItems.length}
            </span>
          )}
        </Link>
      </Button>
  );
};

export default LikeButton;
