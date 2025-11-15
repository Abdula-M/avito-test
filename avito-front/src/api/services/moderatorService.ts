import type { Moderator } from "../types/moderator.types";

import axiosInstance from "../axiosInstance";

export const moderatorService = {
    getCurrent: () => axiosInstance.get<Moderator>("/moderators/me"),
};
