import { HomePage } from "@/pages/home";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyShop | Online Store",
  description: "Buy the best electronics, clothing, and accessories at great prices.",
  openGraph: {
    title: "MyShop | Online Store",
    description: "Quality products with fast delivery.",
    type: "website",
  },
};

export default function RootPage() {
  return <HomePage />
}
