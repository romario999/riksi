import { Container, MainBanners, MainBenefits, MainBottomBanner, MainSlider, MainTabs } from "@/shared/components";
export const revalidate = 60;
export default async function Home() {
  return (
    <>
      <Container>
        <main className="p-4 sm:p-7">
          <MainSlider />
          <MainBanners />
          <MainTabs />
          <MainBottomBanner />
        </main>
      </Container>
      <MainBenefits />
    </>
  );
}
