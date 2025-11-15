import './AdsPagination.scss'

import type { Pagination as PaginationType } from "@/api/types/ads.types"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface AdsPaginationProps {
    pagination: PaginationType
    onPageChange: (page: number) => void
}

export const AdsPagination = ({ pagination, onPageChange }: AdsPaginationProps) => {
    const { currentPage, totalPages, totalItems, itemsPerPage } = pagination

    const getPageNumbers = () => {
        const delta = 2 // Количество страниц до и после текущей
        const range: (number | string)[] = []
        const rangeWithDots: (number | string)[] = []

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i)
            }
            return range
        }

        range.push(1)

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i > 1 && i < totalPages) {
                range.push(i)
            }
        }

        range.push(totalPages)

        let prev = 0
        for (const page of range) {
            if (typeof page === 'number') {
                if (prev && page - prev > 1) {
                    rangeWithDots.push('...')
                }
                rangeWithDots.push(page)
                prev = page
            }
        }

        return rangeWithDots
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="ads-pagination__container">
            <div className="ads-pagination__info">
                Показано {Math.min(itemsPerPage * (currentPage - 1) + 1, totalItems)}
                {' '}-{' '}
                {Math.min(itemsPerPage * currentPage, totalItems)}
                {' '}из {totalItems} объявлений
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {pageNumbers.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    onClick={() => onPageChange(page as number)}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
