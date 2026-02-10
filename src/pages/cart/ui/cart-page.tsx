import { getCurrentUser } from "@/shared/api/auth";
import { CartWidget } from "@/widgets/cart";

export const CartPage = async () => {
  const user = await getCurrentUser()

  return <CartWidget userId={user?.id ?? null} />

}
