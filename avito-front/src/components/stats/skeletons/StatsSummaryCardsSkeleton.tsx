import { StatsCardSkeleton } from "./StatsCardSkeleton";

export const StatsSummaryCardsSkeleton = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <StatsCardSkeleton key={index} />
            ))}
        </div>
    );
};
