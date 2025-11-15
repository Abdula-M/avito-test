import { useQuery } from "@tanstack/react-query";

import type {AdsListParams} from "@/api/types/ads.types.ts";

import { adsService } from "@/api/services/adsService";

export const useAdsList = (params?: AdsListParams) => {
    return useQuery({
        queryKey: ["ads", params],
        queryFn: () => adsService.getList(params).then((res) => res.data),
        placeholderData: (prev) => prev
    });
};
