import clsx from "clsx";

export const ProjectCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="flex justify-between items-center text-sm min-h-[20px]">
        <div className="flex gap-1 items-center">
          <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div
        className={clsx(
          "flex-1 flex flex-col overflow-hidden rounded-lg border border-gray-200 border-t-[8px] bg-white"
        )}
      >
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-6 p-6">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="space-y-1">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="h-6 w-12 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-6 w-12 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-6 w-12 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="relative w-full aspect-video bg-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
