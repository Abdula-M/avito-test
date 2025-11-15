import './ModeratorPanel.scss'

import { forwardRef, useImperativeHandle, useState } from "react"

import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

import { useApproveAd } from "@/hooks/ads/useApproveAd"
import { useRejectAd } from "@/hooks/ads/useRejectAd"
import { useRequestChanges } from "@/hooks/ads/useRequestChanges"

import { RejectReasonDialog } from "../RejectReasonDialog"

interface ModeratorPanelProps {
    adId: number
    adStatus: string
    onSuccess?: () => void
}

export interface ModeratorPanelRef {
    approve: () => void
    openRejectDialog: () => void
}

type DialogType = 'reject' | 'draft' | null

export const ModeratorPanel = forwardRef<ModeratorPanelRef, ModeratorPanelProps>(({ adId, adStatus, onSuccess }, ref) => {
    const [dialogType, setDialogType] = useState<DialogType>(null)

    const approveMutation = useApproveAd()
    const rejectMutation = useRejectAd()
    const requestChangesMutation = useRequestChanges()

    const handleApprove = () => {
        approveMutation.mutate(adId, {
            onSuccess: () => onSuccess?.(),
        })
    }

    const handleReject = (reason: string, comment: string) => {
        rejectMutation.mutate(
            { id: adId, reason, comment: comment || undefined },
            {
                onSuccess: () => onSuccess?.(),
            }
        )
    }

    const handleRequestChanges = (reason: string, comment: string) => {
        requestChangesMutation.mutate(
            { id: adId, reason, comment: comment || undefined },
            {
                onSuccess: () => onSuccess?.(),
            }
        )
    }

    const isLoading =
        approveMutation.isPending ||
        rejectMutation.isPending ||
        requestChangesMutation.isPending

    const isProcessed = adStatus !== 'pending'

    useImperativeHandle(ref, () => ({
        approve: handleApprove,
        openRejectDialog: () => setDialogType('reject')
    }))

    return (
        <>
            <div className="moderator-panel__container">
                <div className="moderator-panel__header">
                    <h3 className="moderator-panel__title">Панель модератора</h3>
                    <p className="moderator-panel__description">
                        {isProcessed
                            ? 'Объявление уже обработано. Вы можете изменить его статус.'
                            : 'Выберите действие для данного объявления'
                        }
                    </p>
                </div>
                <div className="moderator-panel__actions">
                    <button
                        onClick={handleApprove}
                        disabled={isLoading || adStatus === 'approved'}
                        className="moderator-panel__button moderator-panel__button--approve"
                    >
                        <CheckCircle className="moderator-panel__icon" />
                        Одобрить
                    </button>

                    <button
                        onClick={() => setDialogType('reject')}
                        disabled={isLoading || adStatus === 'rejected'}
                        className="moderator-panel__button moderator-panel__button--reject"
                    >
                        <XCircle className="moderator-panel__icon" />
                        Отклонить
                    </button>

                    <button
                        onClick={() => setDialogType('draft')}
                        disabled={isLoading || adStatus === 'draft'}
                        className="moderator-panel__button moderator-panel__button--draft"
                    >
                        <AlertCircle className="moderator-panel__icon" />
                        Вернуть на доработку
                    </button>
                </div>
            </div>

            <RejectReasonDialog
                open={dialogType === 'reject'}
                onOpenChange={() => setDialogType(null)}
                onConfirm={handleReject}
                title="Отклонить объявление"
                description="Укажите причину отклонения объявления. Это поможет пользователю понять, что нужно исправить."
                isLoading={rejectMutation.isPending}
            />

            <RejectReasonDialog
                open={dialogType === 'draft'}
                onOpenChange={() => setDialogType(null)}
                onConfirm={handleRequestChanges}
                title="Вернуть на доработку"
                description="Укажите, что нужно исправить в объявлении."
                isLoading={requestChangesMutation.isPending}
            />
        </>
    )
})
