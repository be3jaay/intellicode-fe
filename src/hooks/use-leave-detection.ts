import { useEffect } from 'react'

export function useLeaveDetection(onLeave: () => void) {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            event.returnValue = ''
            onLeave()
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                onLeave()
            }
        }

        const handleFocus = () => {
            // Reset any leave detection when user returns
        }

        const handleBlur = () => {
            // Detect when user leaves the window
            setTimeout(() => {
                if (!document.hasFocus()) {
                    onLeave()
                }
            }, 100)
        }

        // Add event listeners
        window.addEventListener('beforeunload', handleBeforeUnload)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)
        }
    }, [onLeave])
}
