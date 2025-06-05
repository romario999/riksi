import { MiniProductCard } from "../../mini-product-card";

export const AdminUserLiked = ({ liked }: { liked: any[] }) => {
    if (!liked || liked.length === 0) {
        return <div className="my-10">Немає обраних товарів</div>;
    }

    return (
        <div>
            <h3 className="block text-sm font-medium text-gray-700">Обрані товари</h3>
            <div className="flex gap-4">
                {liked.map((item: any) => (
                    <div key={item.product.id}>
                        <MiniProductCard id={item.product.id} name={item.product.name} imageUrl={item.product.imageUrl} price={item.product.price} url={item.product.productUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
};
