import './RejectReasonDialog.scss'

import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface RejectReasonDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (reason: string, comment: string) => void
    title: string
    description: string
    isLoading?: boolean
}

const REJECTION_REASONS = [
    { value: 'forbidden_item', label: 'Запрещённый товар' },
    { value: 'wrong_category', label: 'Неверная категория' },
    { value: 'incorrect_description', label: 'Некорректное описание' },
    { value: 'photo_issues', label: 'Проблемы с фото' },
    { value: 'fraud_suspicion', label: 'Подозрение на мошенничество' },
    { value: 'other', label: 'Другое' },
]

export const RejectReasonDialog = ({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    isLoading = false,
}: RejectReasonDialogProps) => {
    const [selectedReason, setSelectedReason] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const handleConfirm = () => {
        if (!selectedReason) return

        const reasonLabel =
            REJECTION_REASONS.find((r) => r.value === selectedReason)?.label || selectedReason

        onConfirm(reasonLabel, comment)
        handleClose()
    }

    const handleClose = () => {
        setSelectedReason('')
        setComment('')
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Причина *</Label>
                        <Select value={selectedReason} onValueChange={setSelectedReason}>
                            <SelectTrigger id="reason">
                                <SelectValue placeholder="Выберите причину" />
                            </SelectTrigger>
                            <SelectContent>
                                {REJECTION_REASONS.map((reason) => (
                                    <SelectItem key={reason.value} value={reason.value}>
                                        {reason.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="comment">
                            Дополнительный комментарий{' '}
                            {selectedReason === 'other' && '*'}
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder={
                                selectedReason === 'other'
                                    ? 'Укажите причину...'
                                    : 'Дополнительная информация (необязательно)...'
                            }
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="reject-reason-dialog__textarea"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <div className="reject-reason-dialog__footer">
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className="reject-reason-dialog__button reject-reason-dialog__button--cancel"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedReason || (selectedReason === 'other' && !comment.trim()) || isLoading}
                            className="reject-reason-dialog__button reject-reason-dialog__button--confirm"
                        >
                            {isLoading ? 'Обработка...' : 'Подтвердить'}
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
