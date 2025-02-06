import { Skeleton } from "@/components/ui/skeleton";

export function RecentSalesSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-4 space-y-1">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="ml-auto h-4 w-[80px]" />
        </div>
      ))}
    </div>
  );
}
