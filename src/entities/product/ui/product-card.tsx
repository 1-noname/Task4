import { ReactNode } from "react";

import { CARD_IMAGE_SIZES } from "@/shared/constants/products";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { Product } from "../model/types";

import { Star } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  actionButton: ReactNode
}

export const ProductCard = ({ product, actionButton }: ProductCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 w-full bg-white border-b">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes={CARD_IMAGE_SIZES}
        />

        <Badge className="absolute top-2 right-2 z-10" variant="secondary">
          {product.category}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-0 space-y-2">
        <div className="flex justify-between items-start w-full">
          <CardTitle
            className="text-lg font-bold line-clamp-1"
            title={product.title}
          >
            {product.title}
          </CardTitle>
          <div className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
            <Star size={14} fill="currentColor" />
            {product.rating}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 text-xl font-bold text-primary">
          ${product.price}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        {actionButton}
      </CardFooter>
    </Card>
  );
};
