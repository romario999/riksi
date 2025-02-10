import React from "react";
import { Flame } from "lucide-react";
import { ImageViewer } from "./image-viewer";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel-product";

interface Props {
  items: string[];
  stickers: string[] | undefined;
  productName: string;
}

const CarouselProductImg: React.FC<Props> = ({ items, stickers, productName }) => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [active, setActive] = React.useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!api) return;

    setActive(api.selectedScrollSnap());

    api.on("select", () => {
      setActive(api.selectedScrollSnap());
    });
  }, [api]);

  const handleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(e.currentTarget?.id);
    setActive(index);
    api?.scrollTo(index);
  };

  const openImageViewer = (image: string) => {
    setSelectedImage(image);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setIsViewerOpen(false);
  };

  const changeImage = (index: number) => {
    setActive(index);
  };

  return (
    <>
      <Carousel setApi={setApi} className="w-full mx-auto md:mx-0 max-w-[350px] h-auto md:h-[520px]">
        <CarouselContent className="relative w-full h-full flex gap-6">
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className="flex justify-center relative mx-auto"
              onClick={() => openImageViewer(item)}
            >
              <img
                src={item}
                className="rounded-sm max-w-[300px] ml:max-w-[360px] max-h-[520px] overflow-hidden transition-all duration-300 cursor-pointer"
                alt={`Image ${i}`}
              />
              {stickers?.map((sticker, i) => (
                <div
                  key={i}
                  className={`absolute ${
                    i === 0 ? "top-0" : "top-8"
                  } ${
                    sticker === "HITS" &&
                    "bg-[#28a745] text-white left-1 px-4"
                  } ${
                    sticker === "NEW" &&
                    "bg-[#e80aa4] text-white left-1 px-3"
                  } ${
                    sticker === "PRICEPARTY" &&
                    "bg-yellow-300 left-1 px-1"
                  } rounded-l-full rounded-r-sm text-black py-1 text-sm`}
                >
                  {(sticker === "HITS" ? (
                    <Flame size={18} />
                  ) : null) ||
                    (sticker === "NEW" ? "New" : null) ||
                    (sticker === "PRICEPARTY" ? "Price Party" : null)}
                </div>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center mt-5 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              id={String(i)}
              onClick={handleActive}
              className={`p-0.5 rounded-sm cursor-pointer ${
                i === active ? "border border-primary" : ""
              }`}
            >
              <img
                className="rounded-sm w-[60px] h-[80px]"
                src={item}
                alt="mini-item"
              />
            </div>
          ))}
        </div>

        <div>
          <CarouselPrevious />
        </div>
        <div>
          <CarouselNext />
        </div>
      </Carousel>

      {isViewerOpen && selectedImage && (
        <ImageViewer
          images={items}
          activeIndex={active}
          onClose={closeImageViewer}
          productName={productName}
          onChangeImage={changeImage}
        />
      )}
    </>
  );
};

export default CarouselProductImg;
