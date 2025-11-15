import { useQuery } from "@tanstack/react-query";

import { moderatorService } from "@/api/services/moderatorService";

export const useModeratorInfo = () => {
    return useQuery({
        queryKey: ["moderator", "me"],
        queryFn: () => moderatorService.getCurrent().then((r) => r.data),
    });
};
