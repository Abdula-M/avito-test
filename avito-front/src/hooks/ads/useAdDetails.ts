import { useQuery } from "@tanstack/react-query";

import { adsService } from "@/api/services/adsService";

export const useAdDetails = (id: number) => {
    return useQuery({
        queryKey: ["ad", id],
        queryFn: () => adsService.getById(id).then((res) => res.data),
        enabled: !!id,
    });
};
