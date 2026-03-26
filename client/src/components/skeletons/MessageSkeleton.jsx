const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-900/50">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[60%] rounded-2xl px-4 py-3 space-y-2 ${
              idx % 2 === 0
                ? "bg-gray-200 dark:bg-dark-700"
                : "bg-primary-100 dark:bg-primary-500/20"
            }`}
          >
            <div className="h-3 w-40 rounded bg-gray-300 dark:bg-dark-600 animate-pulse" />
            <div className="h-3 w-28 rounded bg-gray-300 dark:bg-dark-600 animate-pulse" />
            <div className="h-2 w-16 rounded bg-gray-300 dark:bg-dark-600 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
