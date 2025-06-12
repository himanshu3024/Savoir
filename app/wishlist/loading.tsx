export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse" />
            </div>
          ))}
        </div>

        {/* Controls Skeleton */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Products Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-64 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
