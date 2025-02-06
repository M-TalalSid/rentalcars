import { useCallback } from "react"
import { useNotification } from "../contexts/NotificationContext"

export const useNotificationManager = () => {
  const { addNotification } = useNotification()

  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "warning" | "info" = "info", duration = 5000) => {
      addNotification({ message, type, duration })
    },
    [addNotification],
  )

  return { showNotification }
}

