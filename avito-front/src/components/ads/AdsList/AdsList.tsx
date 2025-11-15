import './AdsList.scss'

import type { Advertisement } from "@/api/types/ads.types"

import { AdCard } from "@/components/ads/AdCard"

interface AdsListProps {
    ads: Advertisement[]
    selectedIds?: Set<number>
    onSelect?: (id: number, selected: boolean) => void
    selectionMode?: boolean
}

export const AdsList = ({ ads, selectedIds, onSelect, selectionMode = false }: AdsListProps) => {
    if (!ads || ads.length === 0) {
        return (
            <div className="ads-list__empty">
                <p>Нет объявлений для отображения</p>
            </div>
        )
    }

    return (
        <div className="ads-list__container">
            {ads.map((ad) => (
                <AdCard
                    key={ad.id}
                    ad={ad}
                    isSelected={selectedIds?.has(ad.id)}
                    onSelect={onSelect}
                    selectionMode={selectionMode}
                />
            ))}
        </div>
    )
}
