import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-lg opacity-0 translate-y-4 animate-[fadeSlideIn_0.3s_ease-out_forwards]">
      <CheckCircle className="h-5 w-5 text-green-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}
