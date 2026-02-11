import { Product } from "@/entities/product/model/types";
import { AddToCartButton } from "@/fetures/cart/add-to-cart";
import { IMAGE_SIZE } from "@/shared/constants/products-detail";
import { formatPrice } from "@/shared/lib/currency";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";

import { Star } from "lucide-react";
import Image from "next/image";

interface ProductDetailsWidgetProps {
  product: Product;
}

export const ProductDetailsWidget = ({ product }: ProductDetailsWidgetProps) => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">

      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-white shadow-sm">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-8 hover:scale-105 transition-transform duration-500"
          sizes={IMAGE_SIZE}
          priority
        />
      </div>

      <div className="flex flex-col space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-muted-foreground uppercase">
              {product.category}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-500 font-medium">
              <Star className="fill-current" size={18} />
              <span>{product.rating}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-end gap-4">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {/* {product.discountPercentage > 0 && ( */}
            {/*   <span className="text-lg text-muted-foreground line-through mb-1"> */}
            {/*     {formatPrice(product.price / (1 - product.discountPercentage / 100))} */}
            {/*   </span> */}
            {/* )} */}
          </div>
        </div>

        <Separator />

        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <div className="pt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
