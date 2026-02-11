import { Skeleton } from "@/shared/ui/skeleton";

export const CartSkeleton = () => (
  <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
    <div className="lg:col-span-8 space-y-4">
      <Skeleton className="h-10 w-48 mb-6" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
    <div className="lg:col-span-4">
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  </div>
);
