'use client';

import { Container } from '@/shared/components/shared/container';
import { Title } from '@/shared/components/shared/title';
import { WishlistList } from '@/shared/components/shared/wishlist-list';
import { useFavorites } from '@/shared/hooks';

export default function WishlistPage() {
  const {favoriteItems, favoriteLoading} = useFavorites();
  console.log(favoriteItems);
  return (
    <Container className='my-10'>
      <Title text="Обране" size="md" className="font-bold" />
      <hr className='my-6' />
      {favoriteLoading ? <div className="flex justify-center items-center">Завантаження...</div> : (
        <WishlistList products={favoriteItems} />
      )}
    </Container>
  );
}
