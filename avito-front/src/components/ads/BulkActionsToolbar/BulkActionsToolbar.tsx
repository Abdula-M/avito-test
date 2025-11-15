import './BulkActionsToolbar.scss'

import { useState } from 'react'

import { CheckCircle, XCircle, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useBulkApprove } from '@/hooks/ads/useBulkApprove'
import { useBulkReject } from '@/hooks/ads/useBulkReject'

import { RejectReasonDialog } from '../RejectReasonDialog'

interface BulkActionsToolbarProps {
    selectedIds: Set<number>
    onClearSelection: () => void
}

export const BulkActionsToolbar = ({ selectedIds, onClearSelection }: BulkActionsToolbarProps) => {
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

    const bulkApproveMutation = useBulkApprove()
    const bulkRejectMutation = useBulkReject()

    const selectedCount = selectedIds.size
    const isLoading = bulkApproveMutation.isPending || bulkRejectMutation.isPending

    const handleBulkApprove = () => {
        const ids = Array.from(selectedIds)
        bulkApproveMutation.mutate(ids, {
            onSuccess: () => {
                onClearSelection()
            }
        })
    }

    const handleBulkReject = (reason: string, comment: string) => {
        const ids = Array.from(selectedIds)
        bulkRejectMutation.mutate(
            { ids, reason, comment: comment || undefined },
            {
                onSuccess: () => {
                    onClearSelection()
                }
            }
        )
    }

    if (selectedCount === 0) {
        return null
    }

    return (
        <>
            <div className="bulk-actions-toolbar">
                <div className="bulk-actions-toolbar__content">
                    <div className="bulk-actions-toolbar__info">
                        <span className="bulk-actions-toolbar__count">
                            Выбрано: <strong>{selectedCount}</strong>
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearSelection}
                            disabled={isLoading}
                            className="bulk-actions-toolbar__clear"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Снять выделение
                        </Button>
                    </div>

                    <div className="bulk-actions-toolbar__actions">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleBulkApprove}
                            disabled={isLoading}
                            className="bulk-actions-toolbar__button bulk-actions-toolbar__button--approve"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {isLoading && bulkApproveMutation.isPending
                                ? 'Одобрение...'
                                : `Одобрить (${selectedCount})`
                            }
                        </Button>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setIsRejectDialogOpen(true)}
                            disabled={isLoading}
                            className="bulk-actions-toolbar__button bulk-actions-toolbar__button--reject"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            {isLoading && bulkRejectMutation.isPending
                                ? 'Отклонение...'
                                : `Отклонить (${selectedCount})`
                            }
                        </Button>
                    </div>
                </div>
            </div>

            <RejectReasonDialog
                open={isRejectDialogOpen}
                onOpenChange={setIsRejectDialogOpen}
                onConfirm={handleBulkReject}
                title="Массовое отклонение объявлений"
                description={`Вы собираетесь отклонить ${selectedCount} объявлений. Укажите причину, которая будет применена ко всем выбранным объявлениям.`}
                isLoading={bulkRejectMutation.isPending}
            />
        </>
    )
}
