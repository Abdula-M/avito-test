import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adsService } from "@/api/services/adsService";

interface RequestChangesData {
    id: number;
    reason: string;
    comment?: string;
}

export const useRequestChanges = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, reason, comment }: RequestChangesData) =>
            adsService.requestChanges(id, { reason, comment }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ads"] });
            queryClient.invalidateQueries({ queryKey: ["ad"] });
            toast.success("Объявление возвращено на доработку");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Не удалось вернуть объявление на доработку");
        },
    });
};
