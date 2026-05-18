import { Skeleton } from "@/shared/ui/skeleton";

export const FavoritesSkeleton = () => (
  <div className="container mx-auto mt-4 px-4 pb-10">
    <Skeleton className="mb-6 h-8 w-48" />
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="aspect-[2/3] w-full rounded-xl" />
      ))}
    </div>
  </div>
);
