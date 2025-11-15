import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adsService } from "@/api/services/adsService";

export const useBulkApprove = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (ids: number[]) => {
            const results = await Promise.allSettled(
                ids.map(id => adsService.approve(id))
            );

            const successful = results.filter(r => r.status === 'fulfilled').length;
            const failed = results.filter(r => r.status === 'rejected').length;

            return { successful, failed, total: ids.length, results };
        },
        onSuccess: ({ successful, failed, total }) => {
            queryClient.invalidateQueries({ queryKey: ["ads"] });

            if (failed === 0) {
                toast.success(`Успешно одобрено ${successful} объявлений`);
            } else {
                toast.warning(
                    `Одобрено ${successful} из ${total} объявлений. Не удалось одобрить: ${failed}`
                );
            }
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Не удалось выполнить массовое одобрение"
            );
        },
    });
};
