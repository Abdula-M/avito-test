import { useEffect, useState } from 'react'

import type {AdsFiltersState} from "@/components/ads/AdsFilters/types.ts";

import { SORT_OPTIONS } from './constants'

export const useAdsFilters = (onFiltersChange: (filters: AdsFiltersState) => void) => {
    const [filters, setFilters] = useState<AdsFiltersState>({
        search: '',
        statuses: [],
        categoryId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    })

    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: searchInput }))
        }, 500)

        return () => clearTimeout(timer)
    }, [searchInput])

    useEffect(() => {
        onFiltersChange(filters)
    }, [filters, onFiltersChange])

    const handleStatusToggle = (status: string, checked: boolean) => {
        setFilters(prev => {
            const newStatuses = checked
                ? [...prev.statuses, status]
                : prev.statuses.filter(s => s !== status)
            return { ...prev, statuses: newStatuses }
        })
    }

    const handleCategoryChange = (value: string) => {
        setFilters(prev => ({
            ...prev,
            categoryId: value === 'all' ? undefined : Number(value)
        }))
    }

    const handleSortChange = (value: string) => {
        const sortOption = SORT_OPTIONS.find(opt => opt.value === value)
        if (sortOption) {
            setFilters(prev => ({
                ...prev,
                sortBy: sortOption.sortBy as "createdAt" | "price" | "priority",
                sortOrder: sortOption.sortOrder as "asc" | "desc"
            }))
        }
    }

    const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
        const numValue = value === '' ? undefined : Number(value)
        setFilters(prev => ({
            ...prev,
            [field]: numValue
        }))
    }

    const handleReset = () => {
        setSearchInput('')
        setFilters({
            search: '',
            statuses: [],
            categoryId: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            sortBy: 'createdAt' as const,
            sortOrder: 'desc' as const
        })
    }

    const hasActiveFilters =
        filters.search !== '' ||
        filters.statuses.length > 0 ||
        filters.categoryId !== undefined ||
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined

    return {
        filters,
        searchInput,
        setSearchInput,
        handleStatusToggle,
        handleCategoryChange,
        handleSortChange,
        handlePriceChange,
        handleReset,
        hasActiveFilters
    }
}
