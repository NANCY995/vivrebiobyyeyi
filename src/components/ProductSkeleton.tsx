export function ProductCardSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-lg overflow-hidden flex gap-5 animate-pulse">
        <div className="w-40 h-40 flex-shrink-0 bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 py-3 pr-3 space-y-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
      <div className="p-3.5 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-14" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, viewMode = 'grid' }: { count?: number; viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(count)].map((_, i) => (
          <ProductCardSkeleton key={i} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
