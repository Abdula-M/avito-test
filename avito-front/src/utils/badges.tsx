import { AlertCircle, CheckCircle, XCircle, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export const getStatusBadge = (status: string) => {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="gap-1">
                    <AlertCircle className="w-3 h-3" />
                    На модерации
                </Badge>
            )
        case 'approved':
            return (
                <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                    <CheckCircle className="w-3 h-3" />
                    Одобрено
                </Badge>
            )
        case 'rejected':
            return (
                <Badge variant="destructive" className="gap-1">
                    <XCircle className="w-3 h-3" />
                    Отклонено
                </Badge>
            )
        case 'draft':
            return (
                <Badge variant="secondary" className="gap-1">
                    Черновик
                </Badge>
            )
        case 'requestChanges':
            return (
                <Badge variant="outline" className="gap-1 bg-yellow-100 dark:bg-yellow-900/30">
                    <AlertCircle className="w-3 h-3" />
                    Требуются изменения
                </Badge>
            )
        default:
            return null
    }
}

export const getPriorityBadge = (priority: string) => {
    if (priority === 'urgent') {
        return (
            <Badge variant="default" className="gap-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                <Zap className="w-3 h-3" />
                Срочное
            </Badge>
        )
    }
    return (
        <Badge variant="outline" className="gap-1">
            Обычное
        </Badge>
    )
}
