import { Skeleton } from "../ui";

export const ProductSkeleton = () => {
  return (
    <div className="mx-auto flex justify-center items-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-11 px-2 max-w-[1200px] auto-rows-fr">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="max-w-[190px] mdl:max-w-[270px] transition-all duration-300 hover:translate-y-[-2px] w-full mx-auto"
          >
            <div className="flex justify-center p-6 bg-secondary rounded-lg">
              <Skeleton className="mdl:h-[320px] mdl:w-[270px] w-[142px] h-[240px] rounded-md" />
            </div>

            <Skeleton className="w-3/4 mt-3 mb-1 h-[20px]" />
            <div className="flex flex-col sm:flex-row justify-between mdl:items-center items-start mt-4">
              <Skeleton className="w-[80px] h-[20px]" />
              <Skeleton className="w-[120px] h-[40px] mdl:block hidden" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};