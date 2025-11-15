import './CategoriesChart.scss';

import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCategoryChart } from "@/hooks/stats/useCategoryChart"
import { getChartColor } from "@/utils/chartColors"

interface CategoriesChartProps {
    period?: "today" | "week" | "month" | "custom";
    startDate?: string;
    endDate?: string;
}

export const CategoriesChart = ({ period, startDate, endDate }: CategoriesChartProps) => {
    const { data: categoriesData, isLoading, isError } = useCategoryChart({ period, startDate, endDate });
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Распределение по категориям</CardTitle>
                </CardHeader>
                <CardContent className="categories-chart__loading">
                    <Loader2 className="categories-chart__spinner" />
                </CardContent>
            </Card>
        );
    }

    if (isError || !categoriesData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Распределение по категориям</CardTitle>
                </CardHeader>
                <CardContent className="categories-chart__empty">
                    <p className="categories-chart__empty-text">Нет данных для отображения</p>
                </CardContent>
            </Card>
        );
    }

    const chartData = Object.entries(categoriesData)
        .map(([category, count]) => ({
            category,
            count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Показываем топ-10 категорий

    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Распределение по категориям</CardTitle>
                </CardHeader>
                <CardContent className="categories-chart__empty">
                    <p className="categories-chart__empty-text">Нет данных для отображения</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Распределение по категориям</CardTitle>
                <CardDescription>Топ-10 категорий по количеству проверенных объявлений</CardDescription>
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
                            dataKey="category"
                            tick={{ fontSize: 12, fill: getChartColor('text', isDark) }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
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
                            dataKey="count"
                            fill={getChartColor('primary', isDark)}
                            name="Количество"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
