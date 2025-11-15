import './ModerationHistory.scss'

import { useEffect, useState } from "react"

import { ChevronLeft, ChevronRight, Clock, MessageSquare, User } from "lucide-react"

import type { ModerationHistory as ModerationHistoryType } from "@/api/types/ads.types"

import { Button } from "@/components/ui/button"
import { getStatusBadge } from "@/utils/badges"
import { formatDate } from "@/utils/dateFormat"

interface ModerationHistoryProps {
    history: ModerationHistoryType[]
}

export const ModerationHistory = ({ history }: ModerationHistoryProps) => {
    const [currentIndex, setCurrentIndex] = useState(history.length > 0 ? history.length - 1 : 0)

    useEffect(() => {
        const newIndex = history.length > 0 ? history.length - 1 : 0;

        setCurrentIndex(prev => {
            if (prev === newIndex) return prev;
            return newIndex;
        });
    }, [history]);


    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(history.length - 1, prev + 1))
    }


    if (!history || history.length === 0) {
        return (
            <div className="moderation-history">
                <h2 className="moderation-history__title">История модерации</h2>
                <div className="moderation-history__empty">
                    История модерации пуста
                </div>
            </div>
        )
    }

    const safeIndex = Math.min(currentIndex, history.length - 1)
    const currentItem = history[safeIndex]

    if (!currentItem) {
        return (
            <div className="moderation-history">
                <h2 className="moderation-history__title">История модерации</h2>
                <div className="moderation-history__empty">
                    Загрузка...
                </div>
            </div>
        )
    }

    return (
        <div className="moderation-history">
            <div className="moderation-history__header">
                <h2 className="moderation-history__title">История модерации</h2>
                {history.length > 1 && (
                    <div className="moderation-history__counter">
                        {currentIndex + 1} / {history.length}
                    </div>
                )}
            </div>

            <div className="moderation-history__card">
                <div className="moderation-history__info">
                    <div className="moderation-history__moderator">
                        <User className="moderation-history__moderator-icon" />
                        <span className="moderation-history__moderator-name">{currentItem.moderatorName}</span>
                    </div>
                    {getStatusBadge(currentItem.action)}
                </div>

                <div className="moderation-history__timestamp">
                    <Clock className="moderation-history__timestamp-icon" />
                    <span>{formatDate(currentItem.timestamp)}</span>
                </div>

                {currentItem.comment && (
                    <div className="moderation-history__comment-section">
                        <div className="moderation-history__comment">
                            <MessageSquare className="moderation-history__comment-icon" />
                            <p className="moderation-history__comment-text">{currentItem.comment}</p>
                        </div>
                    </div>
                )}

                {currentItem.reason && (
                    <div className="moderation-history__reason-section">
                        <p className="moderation-history__reason-text">
                            <strong>Причина: </strong>
                            {currentItem.reason}
                        </p>
                    </div>
                )}
            </div>

            {history.length > 1 && (
                <div className="moderation-history__navigation">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="moderation-history__nav-icon" />
                        Предыдущая
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNext}
                        disabled={currentIndex === history.length - 1}
                    >
                        Следующая
                        <ChevronRight className="moderation-history__nav-icon" />
                    </Button>
                </div>
            )}
        </div>
    )
}
