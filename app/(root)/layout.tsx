import { Header } from "@/widgets/header/ui/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
