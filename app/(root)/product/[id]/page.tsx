import { ProductDetailsPage } from "@/pages/product-details/ui/product-details-page";
import { getProduct } from "@/shared/api/get-product";

import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) return { title: "Not found" };

  return { title: product.title };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetailsPage product={product} />;
}
