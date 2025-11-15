import './StatsCard.scss';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export const StatsCard = ({ title, value, description, icon, trend, className }: StatsCardProps) => {
    return (
        <Card className={cn("stats-card", className)}>
            <CardHeader className="stats-card__header">
                <CardTitle className="stats-card__title">{title}</CardTitle>
                {icon && <div className="stats-card__icon">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="stats-card__value">{value}</div>
                {description && (
                    <p className="stats-card__description">{description}</p>
                )}
                {trend && (
                    <div className={cn(
                        "stats-card__trend",
                        trend.isPositive ? "stats-card__trend--positive" : "stats-card__trend--negative"
                    )}>
                        <span>{trend.isPositive ? "↑" : "↓"}</span>
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
