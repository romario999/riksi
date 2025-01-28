import { InfoBlock } from "@/shared/components";

export async function generateMetadata() {
    return {
        title: "Ви не авторизовані | RIKSI",
        description: "Будь ласка, авторизуйтесь, щоб отримати доступ до цієї сторінки сайту.",
    }
}

export default function UnathorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-16 md:mt-40 ">
            <InfoBlock 
                title="Ви не авторизовані"
                text="Будь ласка, авторизуйтесь, щоб отримати доступ до цієї сторінки сайту."
                imageUrl="assets/images/lock.png"
            />
        </div>
    )
}