import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityChartSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between h-80 px-4">
                    {Array.from({ length: 7 }).map((_, index) => {
                        const heights = ['h-32', 'h-40', 'h-48', 'h-56', 'h-44', 'h-52', 'h-36'];
                        return (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                <Skeleton className={`w-full max-w-16 ${heights[index]}`} />
                                <Skeleton className="h-3 w-12" />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
