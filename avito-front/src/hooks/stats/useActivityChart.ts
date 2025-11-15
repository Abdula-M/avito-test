import { useQuery } from "@tanstack/react-query";

import { statsService, type StatsParams } from "@/api/services/statsService";

export const useActivityChart = (params?: StatsParams) => {
    return useQuery({
        queryKey: ["stats", "activity", params],
        queryFn: () => statsService.getActivityChart(params).then((r) => r.data),
    });
};
