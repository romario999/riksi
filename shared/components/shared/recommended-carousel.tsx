'use client'

import { useIsMobile } from "@/shared/hooks";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel-product";
import { MiniProductCard } from "./mini-product-card";
import { ProductCard } from "./product-card";

type Props = {
    products: any[];
};

const RecommendedCarousel = ({   products  }: Props) => {
    const isMobile = useIsMobile(680);

    return (
        <div className="flex justify-center gap-0">
            <Carousel opts={{ align: 'start' }} className='w-full' isProgressbar={true}>
                    <CarouselContent>
                      {products
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
                              />
                            ) : (
                              <ProductCard
                                url={product.productUrl}
                                className='relative w-[280px]'
                                id={product.id}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                price={product.items[0].price}
                                discountPrice={product.items[0].oldPrice}
                                showBtn={false}
                              />
                            )}
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className={`${products.filter(product => product.length > 4 ? 'flex' : 'hidden')}`}>
                      <CarouselPrevious />
                      <CarouselNext />
                    </div>
                  </Carousel>
        </div>
    );
};

export default RecommendedCarousel;