import './StatsSummaryCards.scss';

import { Loader2 } from "lucide-react"

import { useStatsSummary } from "@/hooks/stats/useStatsSummary"

import { StatsCard } from "../StatsCard"

interface StatsSummaryCardsProps {
    period?: "today" | "week" | "month" | "custom";
    startDate?: string;
    endDate?: string;
}

export const StatsSummaryCards = ({ period, startDate, endDate }: StatsSummaryCardsProps) => {
    const { data: stats, isLoading, isError } = useStatsSummary({ period, startDate, endDate });

    if (isLoading) {
        return (
            <div className="stats-summary-cards__loading">
                <Loader2 className="stats-summary-cards__spinner" />
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="stats-summary-cards__error">
                Не удалось загрузить статистику
            </div>
        );
    }

    const getPeriodLabel = () => {
        switch (period) {
            case "today":
                return "за сегодня";
            case "week":
                return "за неделю";
            case "month":
                return "за месяц";
            default:
                return "всего";
        }
    };

    const formatTime = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000);

        if (seconds < 60) return `${seconds} сек`;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes < 60) {
            return remainingSeconds > 0 ? `${minutes} мин ${remainingSeconds} сек` : `${minutes} мин`;
        }

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours} ч ${remainingMinutes} мин` : `${hours} ч`;
    };

    return (
        <div className="stats-summary-cards__grid">
            <StatsCard
                title="Проверено объявлений"
                value={stats.totalReviewed}
                description={getPeriodLabel()}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="stats-summary-cards__icon"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                }
            />
            <StatsCard
                title="Одобрено"
                value={`${stats.approvedPercentage.toFixed(1)}%`}
                description={`${Math.round((stats.totalReviewed * stats.approvedPercentage) / 100)} объявлений`}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="stats-summary-cards__icon stats-summary-cards__icon--approved"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                }
            />
            <StatsCard
                title="Отклонено"
                value={`${stats.rejectedPercentage.toFixed(1)}%`}
                description={`${Math.round((stats.totalReviewed * stats.rejectedPercentage) / 100)} объявлений`}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="stats-summary-cards__icon stats-summary-cards__icon--rejected"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                }
            />
            <StatsCard
                title="Среднее время"
                value={formatTime(stats.averageReviewTime)}
                description="На одно объявление"
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="stats-summary-cards__icon"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                }
            />
        </div>
    );
};
