import type {
    Advertisement,
    AdsListParams,
    AdsListResponse,
} from "../types/ads.types.ts";

import axiosInstance from "../axiosInstance";

export const adsService = {
    getList: (params?: AdsListParams) =>
        axiosInstance.get<AdsListResponse>("/ads", { params }),

    getById: (id: number) =>
        axiosInstance.get<Advertisement>(`/ads/${id}`),

    approve: (id: number) =>
        axiosInstance.post<{ message: string; ad: Advertisement }>(
            `/ads/${id}/approve`
        ),

    reject: (
        id: number,
        data: { reason: string; comment?: string }
    ) =>
        axiosInstance.post<{ message: string; ad: Advertisement }>(
            `/ads/${id}/reject`,
            data
        ),

    requestChanges: (
        id: number,
        data: { reason: string; comment?: string }
    ) =>
        axiosInstance.post<{ message: string; ad: Advertisement }>(
            `/ads/${id}/request-changes`,
            data
        ),
};
