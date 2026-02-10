import { CartPage } from "@/pages/cart/ui/cart-page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cart page',
  description: 'Here is your products which you want to buy'
}

export default function Page() {
  return <CartPage />
}
