export interface AdsFiltersState {
    search: string
    statuses: string[]
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    sortBy?: "createdAt" | "price" | "priority"
    sortOrder?: "asc" | "desc"
}

export interface AdsFiltersProps {
    onFiltersChange: (filters: AdsFiltersState) => void
}
