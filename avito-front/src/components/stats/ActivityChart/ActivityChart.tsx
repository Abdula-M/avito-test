import './ActivityChart.scss';

import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useActivityChart } from "@/hooks/stats/useActivityChart"
import { getChartColor } from "@/utils/chartColors"

interface ActivityChartProps {
    period?: "today" | "week" | "month" | "custom";
    startDate?: string;
    endDate?: string;
}

export const ActivityChart = ({ period, startDate, endDate }: ActivityChartProps) => {
    const { data: activityData, isLoading, isError } = useActivityChart({ period, startDate, endDate });
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>График активности</CardTitle>
                </CardHeader>
                <CardContent className="activity-chart__loading">
                    <Loader2 className="activity-chart__spinner" />
                </CardContent>
            </Card>
        );
    }

    if (isError || !activityData || activityData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>График активности</CardTitle>
                </CardHeader>
                <CardContent className="activity-chart__empty">
                    <p className="activity-chart__empty-text">Нет данных для отображения</p>
                </CardContent>
            </Card>
        );
    }

    const chartData = activityData.map((item) => ({
        date: new Date(item.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
        "Одобрено": item.approved,
        "Отклонено": item.rejected,
        "Запрошены изменения": item.requestChanges,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>График активности</CardTitle>
                <CardDescription>Динамика проверки объявлений по дням</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={getChartColor('muted', isDark)}
                            opacity={0.3}
                        />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: getChartColor('text', isDark) }}
                            stroke={getChartColor('muted', isDark)}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: getChartColor('text', isDark) }}
                            stroke={getChartColor('muted', isDark)}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? 'hsl(222, 47%, 11%)' : 'hsl(0, 0%, 100%)',
                                border: `1px solid ${getChartColor('muted', isDark)}`,
                                borderRadius: '6px',
                                color: getChartColor('text', isDark)
                            }}
                        />
                        <Legend
                            wrapperStyle={{ color: getChartColor('text', isDark) }}
                        />
                        <Bar
                            dataKey="Одобрено"
                            fill={getChartColor('success', isDark)}
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="Отклонено"
                            fill={getChartColor('error', isDark)}
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="Запрошены изменения"
                            fill={getChartColor('warning', isDark)}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
