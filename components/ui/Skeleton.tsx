import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#F9F1ED]", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="w-full space-y-4">
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2 opacity-50" />
      </div>
    </div>
  );
}

export function HorizontalCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-[#C06350]/5 animate-pulse">
      <div className="w-20 h-20 bg-[#F9F1ED] rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[#F9F1ED] rounded-lg w-3/4" />
        <div className="h-3 bg-[#F9F1ED] rounded-lg w-1/2" />
      </div>
    </div>
  );
}

export function PersonSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-3 animate-pulse">
      <div className="w-20 h-20 bg-[#F9F1ED] rounded-full" />
      <div className="space-y-1.5">
        <div className="h-3 bg-[#F9F1ED] rounded-lg w-16 mx-auto" />
        <div className="h-2 bg-[#F9F1ED] rounded-lg w-12 mx-auto opacity-50" />
      </div>
    </div>
  );
}

export function NewsSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 px-4 animate-pulse">
      <div className="flex items-center gap-4 flex-1">
        <div className="h-4 bg-[#F9F1ED] rounded-lg w-16" />
        <div className="h-4 bg-[#F9F1ED] rounded-lg w-1/2" />
      </div>
      <div className="h-4 bg-[#F9F1ED] rounded-lg w-12" />
    </div>
  );
}
