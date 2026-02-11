import { EmptyCart } from "@/entities/cart";
import { CartSkeleton } from "@/entities/cart";
import { CartWidget } from "@/widgets/cart";

export const CartPage = () => {

  return <CartWidget emptySlot={<EmptyCart />} skeleton={<CartSkeleton />} />

}
