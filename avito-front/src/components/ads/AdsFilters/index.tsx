import { Check, Search, SlidersHorizontal, X } from "lucide-react"

import type { AdsFiltersProps } from "@/components/ads/AdsFilters/types.ts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { STATUSES, CATEGORIES, SORT_OPTIONS } from './constants'
import { useAdsFilters } from './useAdsFilters'

export const AdsFilters = ({ onFiltersChange }: AdsFiltersProps) => {
    const {
        filters,
        searchInput,
        setSearchInput,
        handleStatusToggle,
        handleCategoryChange,
        handleSortChange,
        handlePriceChange,
        handleReset,
        hasActiveFilters
    } = useAdsFilters(onFiltersChange)

    return (
        <Card className="mb-6">
            <CardContent>
                <div className="space-y-4">
                    {/* Поиск и Сортировка */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                                Поиск
                            </Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    type="text"
                                    placeholder="Поиск по названию объявления..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-64">
                            <Label htmlFor="sort" className="text-sm font-medium mb-2 block">
                                Сортировка
                            </Label>
                            <Select
                                value={`${filters.sortBy}-${filters.sortOrder}`}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger id="sort">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {SORT_OPTIONS.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Фильтры */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Статус */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block">
                                Статус
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                                        {filters.statuses.length === 0 ? (
                                            <span>Все статусы</span>
                                        ) : (
                                            <span className="truncate">
                                                {STATUSES
                                                    .filter(s => filters.statuses.includes(s.value))
                                                    .map(s => s.label)
                                                    .join(', ')}
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64" align="start">
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm mb-3">Выберите статусы</h4>
                                        {STATUSES.map(status => {
                                            const isChecked = filters.statuses.includes(status.value)
                                            return (
                                                <div
                                                    key={status.value}
                                                    onClick={() => handleStatusToggle(status.value, !isChecked)}
                                                    className={cn(
                                                        "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                                                        isChecked
                                                            ? "bg-primary/10 hover:bg-primary/20 border border-primary"
                                                            : "hover:bg-accent border border-transparent"
                                                    )}
                                                >
                                                    <span className="text-sm font-medium">
                                                        {status.label}
                                                    </span>
                                                    {isChecked && (
                                                        <Check className="h-4 w-4 text-primary" />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label htmlFor="category" className="text-sm font-medium mb-2 block">
                                Категория
                            </Label>
                            <Select
                                value={filters.categoryId?.toString() || 'all'}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Все категории" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все категории</SelectItem>
                                    {CATEGORIES.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="minPrice" className="text-sm font-medium mb-2 block">
                                Цена от
                            </Label>
                            <Input
                                id="minPrice"
                                type="number"
                                placeholder="0"
                                value={filters.minPrice || ''}
                                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                                min="0"
                            />
                        </div>

                        <div>
                            <Label htmlFor="maxPrice" className="text-sm font-medium mb-2 block">
                                Цена до
                            </Label>
                            <Input
                                id="maxPrice"
                                type="number"
                                placeholder="Без ограничений"
                                value={filters.maxPrice || ''}
                                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleReset}
                                className="gap-2"
                            >
                                <X className="h-4 w-4" />
                                Сбросить фильтры
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
