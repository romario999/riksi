import { Header } from "@/shared/components";

export default function FooterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}