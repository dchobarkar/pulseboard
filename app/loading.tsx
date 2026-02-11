import { SkeletonCard } from "@/components/ui/Skeleton";

const Loading = () => {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <SkeletonCard />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default Loading;
