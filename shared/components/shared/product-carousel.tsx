'use client';

import { MiniProductCard } from './mini-product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel-product';
import { ProductCard } from './product-card';
import { Flame } from 'lucide-react';
import { useIsMobile } from '@/shared/hooks';
import { Sticker } from './products-list';


interface ProductCarouselProps {
    stickerType?: string;
    products: any[]; 
}
  
const ProductCarousel = ({ stickerType, products }: ProductCarouselProps) => {


const renderStickers = (stickers: string[]) => {
    return stickers.map((sticker, i) => (
      <Sticker key={i} sticker={sticker} index={i} />
    ));
};

const isMobile = useIsMobile(680);

  return (
    <div className="flex justify-center mt-15 gap-0">
      <Carousel opts={{ align: 'start' }} className='w-full' isProgressbar={true}>
        <CarouselContent>
          {products
            .filter(product => product.sticker.includes(stickerType))
            .map((product) => (
              <CarouselItem isTabs={true} key={product.id} className="flex justify-center md:basis-1/3 lg:basis-1/4 sm:basis-1/2">
                {isMobile ? (
                  <MiniProductCard
                    url={product.productUrl}
                    className='relative'
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.items[0].price}
                    discountPrice={product.items[0].oldPrice}
                  >
                    {renderStickers(product.sticker)}
                  </MiniProductCard>
                ) : (
                  <ProductCard
                    url={product.productUrl}
                    className='relative w-[280px]'
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.items[0].price}
                    discountPrice={product.items[0].oldPrice}
                  >
                    {renderStickers(product.sticker)}
                  </ProductCard>
                )}
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className={`${products.filter(product => product.sticker.includes(stickerType)).length > 4 ? 'flex' : 'hidden'}`}>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;