import { getCurrentUser } from "@/shared/api/auth";
import { LoginWidget } from "@/widgets/auth/login-widget/ui/login-widget";

import { redirect } from "next/navigation";


export const LoginPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return <LoginWidget />
}
