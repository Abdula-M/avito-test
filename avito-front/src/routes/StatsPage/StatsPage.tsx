import "./StatsPage.scss";

import { useState, useRef, useMemo } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Calendar, CalendarDays, CalendarRange, Download, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";

import {
    StatsSummaryCards,
    ActivityChart,
    DecisionsChart,
    CategoriesChart,
    StatsSummaryCardsSkeleton,
    ActivityChartSkeleton,
    DecisionsChartSkeleton,
    CategoriesChartSkeleton,
} from "@/components/stats";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useActivityChart } from "@/hooks/stats/useActivityChart";
import { useCategoryChart } from "@/hooks/stats/useCategoryChart";
import { useStatsSummary } from "@/hooks/stats/useStatsSummary";
import { exportStatsToCSV } from "@/utils/exportStats";
import { exportStatsToPDF } from "@/utils/exportStatsToPDF";
import type { StatsParams } from "@/api/services/statsService";

type PeriodType = "today" | "week" | "month" | "custom";

interface PeriodOption {
    value: PeriodType;
    label: string;
    description: string;
    icon: React.ReactNode;
}

const StatsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("week");
    const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();
    const statsContentRef = useRef<HTMLDivElement>(null);

    // Формируем параметры для запроса с учетом кастомного периода
    const statsParams = useMemo<StatsParams>(() => {
        if (selectedPeriod === "custom" && customDateRange?.from) {
            return {
                period: "custom",
                startDate: format(customDateRange.from, "yyyy-MM-dd"),
                endDate: customDateRange.to
                    ? format(customDateRange.to, "yyyy-MM-dd")
                    : format(customDateRange.from, "yyyy-MM-dd"),
            };
        }
        return { period: selectedPeriod };
    }, [selectedPeriod, customDateRange]);

    const { data: summary } = useStatsSummary(statsParams);
    const { data: activity } = useActivityChart(statsParams);
    const { data: categories } = useCategoryChart(statsParams);

    const handleExportCSV = () => {
        if (!summary || !activity || !categories) {
            toast.warning("Данные еще загружаются. Пожалуйста, подождите.");
            return;
        }

        exportStatsToCSV({
            summary,
            activity,
            categories,
            period: selectedPeriod,
        });
    };

    const handleExportPDF = async () => {
        if (!summary || !activity || !categories) {
            toast.warning("Данные еще загружаются. Пожалуйста, подождите.");
            return;
        }

        if (!statsContentRef.current) {
            toast.error("Не удалось найти контент для экспорта.");
            return;
        }

        await exportStatsToPDF(statsContentRef.current, {
            period: selectedPeriod,
        });
    };

    const periodOptions: PeriodOption[] = [
        {
            value: "today",
            label: "Сегодня",
            description: "Статистика за сегодня",
            icon: <Calendar className="h-4 w-4" />,
        },
        {
            value: "week",
            label: "Последние 7 дней",
            description: "Статистика за неделю",
            icon: <CalendarDays className="h-4 w-4" />,
        },
        {
            value: "month",
            label: "Последние 30 дней",
            description: "Статистика за месяц",
            icon: <CalendarRange className="h-4 w-4" />,
        },
        {
            value: "custom",
            label: "Кастомный период",
            description: "Выберите произвольный период",
            icon: <CalendarRange className="h-4 w-4" />,
        },
    ];

    const isDataLoading = !summary || !activity || !categories;

    return (
        <div className="stats-page">
            <div className="stats-page__header">
                <div className="stats-page__header-content">
                    <h1 className="stats-page__title">Статистика</h1>
                    <p className="stats-page__description">
                        Обзор вашей активности модерации объявлений
                    </p>
                </div>
                <div className="stats-page__actions">
                    <Button
                        onClick={handleExportCSV}
                        disabled={isDataLoading}
                        variant="outline"
                    >
                        {isDataLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}
                        Экспорт в CSV
                    </Button>
                    <Button
                        onClick={handleExportPDF}
                        disabled={isDataLoading}
                        variant="outline"
                    >
                        {isDataLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <FileText className="h-4 w-4" />
                        )}
                        Экспорт в PDF
                    </Button>
                </div>
            </div>

            <div ref={statsContentRef} className="stats-page__content">
                <Card className="stats-page__period-card">
                    <div className="stats-page__period-header">
                        <Calendar className="stats-page__period-icon" />
                        <h3 className="stats-page__period-title">Период</h3>
                    </div>
                    <div className="stats-page__period-options">
                        {periodOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => setSelectedPeriod(option.value)}
                                className={`stats-page__period-option ${
                                    selectedPeriod === option.value
                                        ? 'stats-page__period-option--selected'
                                        : ''
                                }`}
                            >
                                <div className="stats-page__period-option-content">
                                    <div className="stats-page__period-option-icon">
                                        {option.icon}
                                    </div>
                                    <div className="stats-page__period-option-text">
                                        <div className="stats-page__period-option-label">
                                            {option.label}
                                        </div>
                                        <div className="stats-page__period-option-description">
                                            {option.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedPeriod === "custom" && (
                        <div className="stats-page__date-range-picker">
                            <DateRangePicker
                                value={customDateRange}
                                onChange={setCustomDateRange}
                            />
                        </div>
                    )}
                </Card>

                <div className="stats-page__stats-cards">
                    {isDataLoading ? (
                        <StatsSummaryCardsSkeleton />
                    ) : (
                        <StatsSummaryCards period={selectedPeriod} />
                    )}
                </div>

                <div className="stats-page__charts">
                    {isDataLoading ? (
                        <ActivityChartSkeleton />
                    ) : (
                        <ActivityChart period={selectedPeriod} />
                    )}

                    <div className="stats-page__charts-grid">
                        {isDataLoading ? (
                            <>
                                <DecisionsChartSkeleton />
                                <CategoriesChartSkeleton />
                            </>
                        ) : (
                            <>
                                <DecisionsChart period={selectedPeriod} />
                                <CategoriesChart period={selectedPeriod} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;