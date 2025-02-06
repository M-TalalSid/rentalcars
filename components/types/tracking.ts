export interface BookingStatus {
    id: string
    status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
    timestamp: string
  }
  
  export interface TrackingDetails {
    bookingId: string
    customerId: string
    carId: string
    pickupLocation: string
    dropoffLocation: string
    startDate: string
    endDate: string
    status: BookingStatus[]
  }
  
  export interface ShipmentNotification {
    id: string
    type: "booking_confirmation" | "status_update" | "pickup_reminder" | "return_reminder"
    message: string
    timestamp: string
    read: boolean
  }
  
  