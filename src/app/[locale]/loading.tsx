export default function Loading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading content">
      {/* Hero skeleton — dark mode aware */}
      <div className="bg-gray-200 dark:bg-gray-800 h-[50vh] w-full" />

      {/* Categories skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48 mx-auto mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Brands skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
          <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
