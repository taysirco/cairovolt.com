export default function BrandLoading() {
  return (
    <div className="animate-pulse min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-200 h-[400px] w-full" />

      {/* Categories grid skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 bg-gray-200 rounded w-56 mx-auto mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
