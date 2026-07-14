export default function ProductLoading() {
  return (
    <div className="animate-pulse min-h-screen bg-gray-50">
      {/* Breadcrumb skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-72" />
        </div>
      </div>

      {/* Product section skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="space-y-6">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-10 bg-gray-200 rounded w-40 mt-4" />
            <div className="h-14 bg-gray-200 rounded-xl w-full mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
