import { useQuery } from "@tanstack/react-query";

import { statsService, type StatsParams } from "@/api/services/statsService";

export const useDecisionsChart = (params?: StatsParams) => {
    return useQuery({
        queryKey: ["stats", "decisions", params],
        queryFn: () => statsService.getDecisionsChart(params).then((r) => r.data),
    });
};
