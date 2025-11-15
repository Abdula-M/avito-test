import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adsService } from "@/api/services/adsService";

export const useApproveAd = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => adsService.approve(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ads"] });
            queryClient.invalidateQueries({ queryKey: ["ad"] });
            toast.success("Объявление одобрено");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Не удалось одобрить объявление");
        },
    });
};
