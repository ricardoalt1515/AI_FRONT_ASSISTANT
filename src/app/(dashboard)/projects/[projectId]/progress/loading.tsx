import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
      </div>

      {/* Timeline summary skeleton */}
      <div className="p-4 rounded-lg border bg-card/50 space-y-6">
        {/* Phases nodes */}
        <div className="flex items-center justify-between">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center space-y-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              {i < 2 && (
                <div className="flex-1 px-4">
                  <div className="h-1 bg-muted rounded-full mx-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary strip */}
        <div className="flex items-center justify-between text-sm bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Phase cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border bg-card/50 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>

      <Skeleton className="h-4 w-64" />
    </div>
  );
}
