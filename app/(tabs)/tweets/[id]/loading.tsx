export default function Loading() {
    return (
      <div className="p-4">
        <div className="h-8 w-2/3 bg-neutral-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-1/3 bg-neutral-800 rounded mb-8 animate-pulse" />
        <div className="mt-4">
          <div className="px-4 py-2 bg-neutral-700 rounded w-24 h-10 animate-pulse" />
        </div>
      </div>
    );
  }
  