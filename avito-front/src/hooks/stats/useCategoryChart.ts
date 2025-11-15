import { useQuery } from "@tanstack/react-query";

import { statsService, type StatsParams } from "@/api/services/statsService";

export const useCategoryChart = (params?: StatsParams) => {
    return useQuery({
        queryKey: ["stats", "categories", params],
        queryFn: () => statsService.getCategoryChart(params).then((r) => r.data),
    });
};
