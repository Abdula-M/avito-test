import './ItemPage.scss'

import { useRef, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

import type { AdsListResponse } from "@/api/types/ads.types.ts"

import { AdInformation } from '@/components/ads/AdInformation'
import { ImageSlider } from '@/components/ads/ImageSlider'
import { ModerationHistory } from '@/components/ads/ModerationHistory'
import { ModeratorPanel, type ModeratorPanelRef } from '@/components/ads/ModeratorPanel'
import { Button } from '@/components/ui/button'
import { useAdDetails } from '@/hooks/ads/useAdDetails'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { getStatusBadge, getPriorityBadge } from '@/utils/badges'

const ItemPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const moderatorPanelRef = useRef<ModeratorPanelRef>(null)

    const { data: fetchedAd, isLoading, error } = useAdDetails(Number(id))

    const ad = fetchedAd

    const adIds = useMemo(() => {
        const queries = queryClient.getQueriesData<AdsListResponse>({ queryKey: ['ads'] })

        for (const [, data] of queries) {
            if (data?.ads) {
                return data.ads.map(ad => ad.id)
            }
        }

        return []
    }, [queryClient])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [id])

    const currentIndex = adIds.findIndex(adId => adId === Number(id))
    const hasPrevious = currentIndex > 0
    const hasNext = currentIndex >= 0 && currentIndex < adIds.length - 1
    const previousId = hasPrevious ? adIds[currentIndex - 1] : null
    const nextId = hasNext ? adIds[currentIndex + 1] : null

    const handlePrevious = () => {
        if (previousId) {
            navigate(`/item/${previousId}`)
        }
    }

    const handleNext = () => {
        if (nextId) {
            navigate(`/item/${nextId}`)
        }
    }

    useKeyboardShortcuts({
        shortcuts: [
            {
                key: 'a',
                handler: () => moderatorPanelRef.current?.approve(),
                disabled: !ad || ad.status === 'approved'
            },
            {
                key: 'd',
                handler: () => moderatorPanelRef.current?.openRejectDialog(),
                disabled: !ad || ad.status === 'rejected'
            },
            {
                key: 'ArrowLeft',
                handler: handlePrevious,
                disabled: !hasPrevious
            },
            {
                key: 'ArrowRight',
                handler: handleNext,
                disabled: !hasNext
            }
        ],
        enabled: !!ad
    })

    if (isLoading) {
        return (
            <div className="item-page">
                <div className="item-page__loading">
                    <div className="item-page__loading-text">Загрузка...</div>
                </div>
            </div>
        )
    }

    if (error || !ad) {
        return (
            <div className="item-page">
                <div className="item-page__error">
                    <div className="item-page__error-text">
                        {error ? 'Ошибка загрузки объявления' : 'Объявление не найдено'}
                    </div>
                    <Button onClick={() => navigate('/')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Вернуться к списку
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="item-page">
            <div className="item-page__card">
                <div className="item-page__header">
                    <h1 className="item-page__title">{ad.title}</h1>
                    <div className="item-page__badges">
                        {getPriorityBadge(ad.priority)}
                        {getStatusBadge(ad.status)}
                    </div>
                </div>

                <div className="item-page__content">
                    <div>
                        <ImageSlider images={ad.images} title={ad.title} />
                    </div>

                    <div>
                        <ModerationHistory history={ad.moderationHistory} />
                    </div>
                </div>

                <AdInformation ad={ad} />

                <div className="item-page__moderation-panel">
                    <ModeratorPanel ref={moderatorPanelRef} adId={ad.id} adStatus={ad.status} />
                </div>
            </div>

            <div className="item-page__navigation">
                <Button variant="outline" onClick={() => navigate('/')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    К списку
                </Button>

                <div className="item-page__nav-actions">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Предыдущая
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleNext}
                        disabled={!hasNext}
                    >
                        Следующая
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ItemPage