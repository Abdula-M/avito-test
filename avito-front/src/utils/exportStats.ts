import { toast } from "sonner";

import type { StatsSummary, ActivityData } from "@/api/types/stats.types";

interface ExportStatsData {
    summary: StatsSummary;
    activity: ActivityData[];
    categories: Record<string, number>;
    period: "today" | "week" | "month" | "custom";
}

const getPeriodLabel = (period: "today" | "week" | "month" | "custom"): string => {
    switch (period) {
        case "today":
            return "Сегодня";
        case "week":
            return "Последние 7 дней";
        case "month":
            return "Последние 30 дней";
        case "custom":
            return "Кастомный период";
    }
};

const formatTime = (milliseconds: number): string => {
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

const wrapCSV = (value: string | number): string => {
    const str = String(value);
    return `"${str.replace(/"/g, '""')}"`;
};

export const exportStatsToCSV = (data: ExportStatsData): void => {
    try {
        toast.loading("Подготовка CSV файла...", { id: "csv-export" });

        const { summary, activity, categories, period } = data;
        const lines: string[] = [];

        lines.push(`СТАТИСТИКА МОДЕРАЦИИ ОБЪЯВЛЕНИЙ`);
        lines.push(`Период,${wrapCSV(getPeriodLabel(period))}`);
        lines.push(`Дата экспорта,${wrapCSV(`${new Date().toLocaleDateString("ru-RU")} ${new Date().toLocaleTimeString("ru-RU")}`)}`);
        lines.push('');
        lines.push('ОБЩАЯ СВОДКА');
        lines.push('Показатель,Значение');

    const approvedCount = Math.round((summary.totalReviewed * summary.approvedPercentage) / 100);
    const rejectedCount = Math.round((summary.totalReviewed * summary.rejectedPercentage) / 100);
    const requestChangesCount = Math.round((summary.totalReviewed * summary.requestChangesPercentage) / 100);

    lines.push(`Всего проверено,${wrapCSV(summary.totalReviewed)}`);
    lines.push(`Одобрено,${wrapCSV(`${approvedCount} (${summary.approvedPercentage.toFixed(1)}%)`)}`);
    lines.push(`Отклонено,${wrapCSV(`${rejectedCount} (${summary.rejectedPercentage.toFixed(1)}%)`)}`);
    lines.push(`Запрошены изменения,${wrapCSV(`${requestChangesCount} (${summary.requestChangesPercentage.toFixed(1)}%)`)}`);
    lines.push(`Среднее время проверки,${wrapCSV(formatTime(summary.averageReviewTime))}`);
    lines.push('');

    lines.push('АКТИВНОСТЬ ПО ДНЯМ');
    if (activity.length > 0) {
        lines.push('Дата,Одобрено,Отклонено,Изменения,Всего');
        activity.forEach((item) => {
            const date = new Date(item.date).toLocaleDateString("ru-RU");
            const total = item.approved + item.rejected + item.requestChanges;
            lines.push(`${wrapCSV(date)},${wrapCSV(item.approved)},${wrapCSV(item.rejected)},${wrapCSV(item.requestChanges)},${wrapCSV(total)}`);
        });
    } else {
        lines.push('Нет данных');
    }

    lines.push('');

    lines.push('РАСПРЕДЕЛЕНИЕ ПО КАТЕГОРИЯМ');

    const categoriesArray = Object.entries(categories)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

    if (categoriesArray.length > 0) {
        lines.push('Категория,Количество,Процент');
        categoriesArray.forEach((item) => {
            const percentage = ((item.count / summary.totalReviewed) * 100).toFixed(1);
            lines.push(`${wrapCSV(item.category)},${wrapCSV(item.count)},${wrapCSV(`${percentage}%`)}`);
        });
    } else {
        lines.push('Нет данных');
    }

        const csv = lines.join('\n');
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        const fileName = `stats_${period}_${new Date().toISOString().split('T')[0]}.csv`;

        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("CSV файл успешно экспортирован!", { id: "csv-export" });
    } catch (error) {
        console.error("Error exporting CSV:", error);
        toast.error("Ошибка при экспорте CSV файла", { id: "csv-export" });
    }
};
