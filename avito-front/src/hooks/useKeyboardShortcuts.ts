import { useEffect } from 'react'

export interface KeyboardShortcut {
    key: string
    handler: () => void
    disabled?: boolean
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
}

interface UseKeyboardShortcutsOptions {
    shortcuts: KeyboardShortcut[]
    enabled?: boolean
}

export const useKeyboardShortcuts = ({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) => {
    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement
            const tagName = target.tagName.toLowerCase()
            const isEditable = target.isContentEditable

            if (tagName === 'input' || tagName === 'textarea' || isEditable) {
                if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== '/') {
                    return
                }

                if (event.key === '/') {
                    return
                }
            }

            const shortcut = shortcuts.find(s => {
                const keyMatch = s.key.toLowerCase() === event.key.toLowerCase()
                const ctrlMatch = s.ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
                const shiftMatch = s.shiftKey ? event.shiftKey : !event.shiftKey
                const altMatch = s.altKey ? event.altKey : !event.altKey

                return keyMatch && ctrlMatch && shiftMatch && altMatch && !s.disabled
            })

            if (shortcut) {
                event.preventDefault()
                shortcut.handler()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [shortcuts, enabled])
}
