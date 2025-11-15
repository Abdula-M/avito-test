import type {
    StatsSummary,
    ActivityData,
    DecisionsData,
} from "../types/stats.types";

import axiosInstance from "../axiosInstance";

export interface StatsParams {
    period?: "today" | "week" | "month" | "custom";
    startDate?: string;
    endDate?: string;
}

export const statsService = {
    getSummary: (params?: StatsParams) =>
        axiosInstance.get<StatsSummary>("/stats/summary", { params }),

    getActivityChart: (params?: StatsParams) =>
        axiosInstance.get<ActivityData[]>("/stats/chart/activity", { params }),

    getDecisionsChart: (params?: StatsParams) =>
        axiosInstance.get<DecisionsData>("/stats/chart/decisions", { params }),

    getCategoryChart: (params?: StatsParams) =>
        axiosInstance.get<Record<string, number>>(
            "/stats/chart/categories",
            { params }
        ),
};
