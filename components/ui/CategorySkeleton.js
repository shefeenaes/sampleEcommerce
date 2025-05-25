export default function CategorySkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white border rounded-xl shadow p-4 space-y-4"
        >
          <div className="w-full h-48 bg-gray-200 rounded-md" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
}
