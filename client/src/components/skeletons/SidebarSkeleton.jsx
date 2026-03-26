const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-gray-200 dark:border-dark-700 flex flex-col bg-white dark:bg-dark-800">
      {/* Header skeleton */}
      <div className="border-b border-gray-200 dark:border-dark-700 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-200 dark:bg-dark-600 animate-pulse" />
          <div className="w-20 h-4 rounded bg-gray-200 dark:bg-dark-600 animate-pulse hidden lg:block" />
        </div>
        <div className="w-full h-9 rounded-lg bg-gray-200 dark:bg-dark-600 animate-pulse hidden lg:block" />
      </div>

      {/* Contact skeletons */}
      <div className="overflow-y-auto flex-1 py-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-dark-600 animate-pulse flex-shrink-0 mx-auto lg:mx-0" />
            <div className="hidden lg:block flex-1 space-y-1.5">
              <div className="h-4 w-32 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
