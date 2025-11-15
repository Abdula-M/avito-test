import './DecisionsChart.scss';

import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDecisionsChart } from "@/hooks/stats/useDecisionsChart"
import { getChartColor } from "@/utils/chartColors"

interface DecisionsChartProps {
    period?: "today" | "week" | "month" | "custom";
    startDate?: string;
    endDate?: string;
}

const LABELS = {
    approved: "Одобрено",
    rejected: "Отклонено",
    requestChanges: "Запрошены изменения",
};

export const DecisionsChart = ({ period, startDate, endDate }: DecisionsChartProps) => {
    const { data: decisionsData, isLoading, isError } = useDecisionsChart({ period, startDate, endDate });
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const COLORS = {
        approved: getChartColor('success', isDark),
        rejected: getChartColor('error', isDark),
        requestChanges: getChartColor('warning', isDark),
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Распределение решений</CardTitle>
                </CardHeader>
                <CardContent className="decisions-chart__loading">
                    <Loader2 className="decisions-chart__spinner" />
                </CardContent>
            </Card>
        );
    }

    if (isError || !decisionsData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Распределение решений</CardTitle>
                </CardHeader>
                <CardContent className="decisions-chart__empty">
                    <p className="decisions-chart__empty-text">Нет данных для отображения</p>
                </CardContent>
            </Card>
        );
    }

    const chartData = [
        { name: LABELS.approved, value: decisionsData.approved, key: "approved" },
        { name: LABELS.rejected, value: decisionsData.rejected, key: "rejected" },
        { name: LABELS.requestChanges, value: decisionsData.requestChanges, key: "requestChanges" },
    ].filter((item) => item.value > 0);

    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Распределение решений</CardTitle>
                </CardHeader>
                <CardContent className="decisions-chart__empty">
                    <p className="decisions-chart__empty-text">Нет данных для отображения</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Распределение решений</CardTitle>
                <CardDescription>Соотношение различных решений по объявлениям</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={`cell-${entry.key}`}
                                    fill={COLORS[entry.key as keyof typeof COLORS]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => `${value.toFixed(1)}%`}
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
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
