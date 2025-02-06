"use client"

import { Bell } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ShipmentNotification } from "../types/tracking"

interface NotificationPanelProps {
  notifications: ShipmentNotification[]
  onMarkAsReadAction: (id: string) => void
}

export function NotificationPanel({ notifications, onMarkAsReadAction }: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${notification.read ? "bg-muted" : "bg-primary/5"}`}
              onClick={() => !notification.read && onMarkAsReadAction(notification.id)}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{notification.type.replace("_", " ").toUpperCase()}</span>
                <Badge variant="outline" className="text-xs">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

