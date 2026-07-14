export default function CategoryLoading() {
  return (
    <div className="animate-pulse min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gray-200 h-[250px] w-full" />

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-64 bg-gray-200 rounded-2xl mt-8" />
          </div>

          {/* Sidebar products */}
          <div className="lg:col-span-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-40 mb-6" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-3 bg-gray-100 rounded-xl">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
