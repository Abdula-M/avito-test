import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adsService } from "@/api/services/adsService";

interface RejectData {
    id: number;
    reason: string;
    comment?: string;
}

export const useRejectAd = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, reason, comment }: RejectData) =>
            adsService.reject(id, { reason, comment }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ads"] });
            queryClient.invalidateQueries({ queryKey: ["ad"] });
            toast.success("Объявление отклонено");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Не удалось отклонить объявление");
        },
    });
};
