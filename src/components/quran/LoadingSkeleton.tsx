"use client";

export function SurahGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

export function AyahListSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-8 w-3/4 ml-auto rounded bg-gray-100 animate-pulse" />
          <div className="h-5 w-full rounded bg-gray-50 animate-pulse" />
          <div className="h-5 w-2/3 rounded bg-gray-50 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
