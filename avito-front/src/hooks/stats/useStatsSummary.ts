import { useQuery } from "@tanstack/react-query";

import { statsService, type StatsParams } from "@/api/services/statsService";

export const useStatsSummary = (params?: StatsParams) => {
    return useQuery({
        queryKey: ["stats", "summary", params],
        queryFn: () => statsService.getSummary(params).then((r) => r.data),
    });
};
