import type { Product } from "@/entities/product/model/types";
import { ProductDetailsWidget } from "@/widgets/product-details";

export const ProductDetailsPage = ({ product }: { product: Product }) => {
  return <ProductDetailsWidget product={product} />
}
