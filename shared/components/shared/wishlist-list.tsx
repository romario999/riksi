import { Product } from "@prisma/client";
import { ProductCard } from "./product-card";

interface Props {
    products: any[];
}

export const WishlistList: React.FC<Props> = ({ products }) => {
    console.log(products.map(product => product.imageUrl));
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    url={product.productUrl}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    discountPrice={product.oldPrice}
                    showBtn={false}
                />
            ))}
        </div>
    )
}