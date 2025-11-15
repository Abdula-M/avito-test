import './AdCard.scss'

import { useNavigate } from "react-router-dom"

import { Clock, Tag } from "lucide-react"

import type { Advertisement } from "@/api/types/ads.types"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageWithLoader } from "@/components/ui/image-with-loader"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { getPriorityBadge, getStatusBadge } from "@/utils/badges"
import { formatShortDate } from "@/utils/dateFormat"
import { formatPrice } from "@/utils/formatters"

interface AdCardProps {
    ad: Advertisement
    isSelected?: boolean
    onSelect?: (id: number, selected: boolean) => void
    selectionMode?: boolean
}

export const AdCard = ({ ad, isSelected = false, onSelect, selectionMode = false }: AdCardProps) => {
    const navigate = useNavigate()

    const handleOpenAd = () => {
        navigate(`/item/${ad.id}`)
    }

    const handleCheckboxChange = (checked: boolean) => {
        onSelect?.(ad.id, checked)
    }

    const handleCardClick = (e: React.MouseEvent) => {
        if (selectionMode) {
            e.stopPropagation()
            onSelect?.(ad.id, !isSelected)
        } else {
            handleOpenAd()
        }
    }

    return (
        <div className={`ad-item ${isSelected ? 'ad-item--selected' : ''}`}>
            <Item
                variant="outline"
                className={`ad-item__wrapper cursor-pointer transition-all duration-300
                    shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]
                    ${isSelected ? 'ring-2 ring-primary bg-primary/5 !shadow-primary/20' : ''}`}
                onClick={handleCardClick}
            >
                {selectionMode && (
                    <div
                        className="ad-card__checkbox"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Checkbox
                            checked={isSelected}
                            onCheckedChange={handleCheckboxChange}
                            aria-label={`Выбрать ${ad.title}`}
                        />
                    </div>
                )}

                <ItemMedia className="w-32 h-32 flex-shrink-0">
                    <ImageWithLoader
                        src={ad.images[0]}
                        alt={ad.title}
                        className="w-full h-full object-cover rounded"
                    />
                </ItemMedia>
                <ItemContent className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <ItemTitle className="text-lg font-semibold">
                            {ad.title}
                        </ItemTitle>
                        <div className="flex gap-2 flex-shrink-0">
                            {getPriorityBadge(ad.priority)}
                            {getStatusBadge(ad.status)}
                        </div>
                    </div>

                    <div className="ad-card__price">
                        {formatPrice(ad.price)}
                    </div>

                    <div className="ad-card__meta">
                        <div className="ad-card__meta-item">
                            <Tag className="ad-card__icon" />
                            <span>{ad.category}</span>
                        </div>
                        <div className="ad-card__meta-item">
                            <Clock className="ad-card__icon" />
                            <span>{formatShortDate(ad.createdAt)}</span>
                        </div>
                    </div>
                </ItemContent>
                <ItemActions>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleOpenAd()
                        }}
                    >
                        Открыть
                    </Button>
                </ItemActions>
            </Item>
        </div>
    )
}
