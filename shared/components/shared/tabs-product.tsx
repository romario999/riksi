import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

export const TabsProduct = () => {
  return (
    <div>
        <Tabs defaultValue="delivery" className="max-w-[700px] overflow-hidden">
            <TabsList>
                <TabsTrigger className='data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black' value="delivery">Доставка</TabsTrigger>
                <TabsTrigger className='data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black' value="payment">Оплата</TabsTrigger>
                <TabsTrigger className='data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black' value="guarantee">Гарантія</TabsTrigger>
                <TabsTrigger className='data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black' value="bonuses">Бонуси</TabsTrigger>
            </TabsList>
            <TabsContent value="delivery">Речі, які є в наявності, відправляємо протягом 3-5  робочих днів . Якщо обраного Вашого товару немає в наявності, то пошив та відправка буде займати 7-10 робочих днів. <br /> <br />
                Доставка Новою поштою та Укрпоштою по Україні та за кордоном за тарифами перевізників (за рахунок замовника). <br /> <br />
                <b>При замовленні від 4000 грн доставка по Україні безкоштовно.</b> <br /> <br />
                <b>Увага!</b> Колір товару на фото може відрізнятися від реального, оскільки це пов'язано з особливостями кольорових відтінків Вашого телефону, налаштуваннями дисплеїв фотокамери або іншими факторами.</TabsContent>
            <TabsContent value="payment">
                <b>Оплата замовлень по Україні:</b> <br /> <br />
                <ul className='flex flex-col gap-4'>
                    <li>— Через WayForPay;</li>
                    <li>— карту ФОП;</li>
                    <li>— За реквізитами IBAN;</li>
                    <li>— Накладений платіж.</li>
                </ul> <br />
                <b>Оплата для міжнародних замовлень:</b> <br /><br />
                <ul className='flex flex-col gap-4'>
                <li>— Через WayForPay.</li>
                </ul>
            </TabsContent>
            <TabsContent value="guarantee">
                Гарантія діє на всі види товарів 30 днів з моменту покупки. Відповідаємо за якість власних виробів і зобов'язуємося зробити обмін або повернення у разі виявлення виробничого браку.
            </TabsContent>
            <TabsContent value="bonuses">
                <b>Умови бонусної системи знижок</b> <br /><br />
                За кожну покупку на сайті клієнт отримує 3% кешбек від суми замовлення.
                Кешбек нараховується на всі товари автоматично після підтвердження оплати.
                Кешбек можна використовувати для оплат наступних замовлень або накопичувати.
                Суму нарахованого кешбеку від Ваших замовлень можна уточнити у менеджера.
            </TabsContent>
        </Tabs>
    </div>
  );
};