import { JsonValue } from "@prisma/client/runtime/library";
import { Title } from "../../title";

interface Product {
  name: string;
  quantity: number;
  price?: number;
  imageUrl?: string;
}

interface Props {
  popularProducts: {
    items: JsonValue;
  }[];
}

export const MainPopularProducts: React.FC<Props> = ({ popularProducts }) => {
  const products = popularProducts.flatMap(group =>
    typeof group.items === 'string' ? JSON.parse(group.items) : []
  ).map((item: any) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    imageUrl: item.imageUrl
  }));

  const groupedProducts = products.reduce<Product[]>((acc, product) => {
    const existingProduct = acc.find(p => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      acc.push({ ...product });
    }
    return acc;
  }, []);

  const top5Products = groupedProducts
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-3 w-[340px] overflow-hidden">
      <Title
        text="Популярні товари (7 днів)"
        size="sm"
        className="mb-2 text-gray-800 leading-tight truncate"
      />

      <div className="space-y-2">
        {top5Products.map((product, index) => (
          <div
            key={`${product.name}-${index}`}
            className="flex items-center gap-2 h-[30px] overflow-hidden"
          >
            <span className="text-gray-400 text-[13px] w-4 text-right">
              {index + 1}.
            </span>

            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-7 h-7 object-cover rounded-sm shrink-0"
                loading="lazy"
              />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-[14px] text-gray-800 truncate leading-none">{product.name}</p>
              <div className="text-[12px] text-gray-500 flex gap-1 leading-none">
                <span>x{product.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {top5Products.length === 0 && (
        <p className="text-gray-500 text-center py-3 text-xs">
          Немає даних про товари
        </p>
      )}
    </div>
  );
};
