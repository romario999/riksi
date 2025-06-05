export type AdminCarouselBannerUpdate = {
    name: string;
    altText: string | null;
    link: string | null;
    position: number | null;
    imageUrl: string;
    isActive: boolean;
    isMobile: boolean;
}