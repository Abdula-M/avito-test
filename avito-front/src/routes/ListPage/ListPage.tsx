import './ListPage.scss'

import { useState, useCallback } from 'react'

import { CheckSquare, Square } from 'lucide-react'

import type { AdsFiltersState } from "@/components/ads/AdsFilters/types"

import { AdsList, AdsFilters, AdCardSkeleton } from "@/components/ads"
import { AdsPagination } from "@/components/ads/AdsPagination"
import { BulkActionsToolbar } from "@/components/ads/BulkActionsToolbar"
import { Button } from "@/components/ui/button"
import { useAdsList } from "@/hooks/ads/useAdsList.ts"
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

const ListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState<AdsFiltersState>({
        search: '',
        statuses: [],
        categoryId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    })
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
    const [isSelectionModeEnabled, setIsSelectionModeEnabled] = useState(false)
    const itemsPerPage = 10

    const { data, isLoading, error } = useAdsList({
        page: currentPage,
        limit: itemsPerPage,
        search: filters.search || undefined,
        status: filters.statuses.length > 0 ? filters.statuses : undefined,
        categoryId: filters.categoryId,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
    })

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setSelectedIds(new Set()) // Очищаем выбор при смене страницы
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleFiltersChange = useCallback((newFilters: AdsFiltersState) => {
        setFilters(newFilters)
        setCurrentPage(1)
        setSelectedIds(new Set()) // Очищаем выбор при изменении фильтров
    }, [])

    const handleSelect = useCallback((id: number, selected: boolean) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev)
            if (selected) {
                newSet.add(id)
            } else {
                newSet.delete(id)
            }
            return newSet
        })
    }, [])

    const handleClearSelection = useCallback(() => {
        setSelectedIds(new Set())
        setIsSelectionModeEnabled(false)
    }, [])

    const toggleSelectionMode = useCallback(() => {
        setIsSelectionModeEnabled(prev => !prev)
        setSelectedIds(new Set()) // Очищаем выбор при переключении режима
    }, [])

    const selectionMode = isSelectionModeEnabled || selectedIds.size > 0

    useKeyboardShortcuts({
        shortcuts: [
            {
                key: '/',
                handler: () => {
                    const searchInput = document.getElementById('search') as HTMLInputElement
                    if (searchInput) {
                        searchInput.focus()
                    }
                }
            }
        ]
    })

    if (error) {
        return (
            <div className="list-page__error">
                <div className="list-page__error-text">
                    Ошибка: {error.message}
                </div>
            </div>
        )
    }

    return (
        <div className="list-page">
            <div className="list-page__header-wrapper">
                <div className="list-page__header">
                    <div className="list-page__header-content">
                        <h1 className="list-page__title">Список объявлений</h1>
                        {data?.pagination && (
                            <p className="list-page__subtitle">
                                Найдено {data.pagination.totalItems} объявлений
                            </p>
                        )}
                    </div>
                    <Button
                        variant={isSelectionModeEnabled ? "default" : "outline"}
                        size="sm"
                        onClick={toggleSelectionMode}
                        className="list-page__selection-toggle"
                    >
                        {isSelectionModeEnabled ? (
                            <>
                                <CheckSquare className="w-4 h-4" />
                                Отменить выбор
                            </>
                        ) : (
                            <>
                                <Square className="w-4 h-4" />
                                Выбрать несколько
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <AdsFilters onFiltersChange={handleFiltersChange} />

            {isSelectionModeEnabled && selectedIds.size === 0 && !isLoading && (
                <div className="list-page__info-banner">
                    <p className="list-page__info-text">
                        Режим выбора активен. Нажмите на карточки или чекбоксы, чтобы выбрать объявления для массовых операций.
                    </p>
                </div>
            )}

            <BulkActionsToolbar
                selectedIds={selectedIds}
                onClearSelection={handleClearSelection}
            />

            {isLoading ? (
                <div className="list-page__ads-list">
                    {Array.from({ length: itemsPerPage }).map((_, index) => (
                        <AdCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <AdsList
                    ads={data?.ads || []}
                    selectedIds={selectedIds}
                    onSelect={handleSelect}
                    selectionMode={selectionMode}
                />
            )}

            {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="list-page__pagination">
                    <AdsPagination
                        pagination={data.pagination}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default ListPage