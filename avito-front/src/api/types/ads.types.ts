export interface Advertisement {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: number;
    status: "pending" | "approved" | "rejected" | "draft";
    priority: "normal" | "urgent";
    createdAt: string;
    updatedAt: string;
    images: string[];
    seller: Seller;
    characteristics: Record<string, string>;
    moderationHistory: ModerationHistory[];
}

export interface Seller {
    id: number;
    name: string;
    rating: string;
    totalAds: number;
    registeredAt: string;
}

export interface ModerationHistory {
    id: number;
    moderatorId: number;
    moderatorName: string;
    action: "approved" | "rejected" | "requestChanges";
    reason?: string | null;
    comment: string;
    timestamp: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface AdsListParams {
    page?: number;
    limit?: number;
    status?: string[];
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: "createdAt" | "price" | "priority";
    sortOrder?: "asc" | "desc";
}

export interface AdsListResponse {
    ads: Advertisement[];
    pagination: Pagination;
}
