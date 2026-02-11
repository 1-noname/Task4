import { AuthProvider } from "@/fetures/auth/lib/auth-provider";
import { getCurrentUser } from "@/shared/api/auth";
import { Header } from "@/widgets/header/ui/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser()
  const userId = user ? user.id : null

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black font-sans">
      <Header />
      <AuthProvider userId={userId}>
        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
        </main>

      </AuthProvider>
    </div>
  );
}
