import { AuthProvider } from "@/fetures/auth/lib/auth-provider";
import { getCurrentUser } from "@/shared/api/auth";
import { Header } from "@/widgets/header/ui/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const userId = user ? user.id : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AuthProvider userId={userId}>
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </AuthProvider>
    </div>
  );
}
