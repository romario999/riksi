import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Оформлення замовлення',
    description: 'Оформлення замовлення',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <main className="min-h-screen bg-[#F4F1EE]">
        <Container>
            <Suspense>
                <Header bg='bg-[#F4F1EE]' hasSearch={false} hasMenu={false} hasCart={false} classname="border-b-gray-200" />
            </Suspense>
            {children}
        </Container>
    </main>;
}