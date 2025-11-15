import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adsService } from "@/api/services/adsService";

interface BulkRejectData {
    ids: number[];
    reason: string;
    comment?: string;
}

export const useBulkReject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ ids, reason, comment }: BulkRejectData) => {
            const results = await Promise.allSettled(
                ids.map(id => adsService.reject(id, { reason, comment }))
            );

            const successful = results.filter(r => r.status === 'fulfilled').length;
            const failed = results.filter(r => r.status === 'rejected').length;

            return { successful, failed, total: ids.length, results };
        },
        onSuccess: ({ successful, failed, total }) => {
            queryClient.invalidateQueries({ queryKey: ["ads"] });

            if (failed === 0) {
                toast.success(`Успешно отклонено ${successful} объявлений`);
            } else {
                toast.warning(
                    `Отклонено ${successful} из ${total} объявлений. Не удалось отклонить: ${failed}`
                );
            }
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Не удалось выполнить массовое отклонение"
            );
        },
    });
};
