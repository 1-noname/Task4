import type { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AddToCartButton } from "@/fetures/cart/add-to-cart";
import { InfiniteScroll } from "@/fetures/infinite-scroll";

interface ProductListWidgetProps {
  initialProducts: Product[];
}

export const ProductListWidget = ({ initialProducts }: ProductListWidgetProps) => {
  return (
    <section className="container p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Products catalog</h2>
        <span className="text-muted-foreground">Select products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {initialProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            actionButton={<AddToCartButton product={product} />}
          />
        ))}

        <InfiniteScroll />
      </div>
    </section>
  );
};
