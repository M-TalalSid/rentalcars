"use server"

import { client } from "@/lib/sanity"
import { revalidatePath } from "next/cache"
import { nanoid } from "nanoid"

export async function createRentalOrder(formData: {
  name: string
  phone: string
  email: string
  address: string
  city: string
  pickupDate: Date
  dropoffDate: Date
  carId: string
  paymentType: "credit-card" | "paypal"
  totalAmount: number
  paypalTransactionId?: string
  marketingConsent: boolean
  termsAccepted: boolean
}) {
  try {
    // Validate Sanity connection first
    try {
      await client.fetch('*[_type == "rental"][0]')
    } catch (error) {
      console.error("Sanity authentication error:", error)
      throw new Error("Unable to connect to Sanity. Please check your API token and permissions.")
    }

    const orderNumber = `RNT-${nanoid(8).toUpperCase()}`

    const rentalOrder = {
      _type: "rental",
      orderNumber,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      pickupDate: formData.pickupDate.toISOString(),
      dropoffDate: formData.dropoffDate.toISOString(),
      car: {
        _type: "reference",
        _ref: formData.carId,
      },
      paymentType: formData.paymentType,
      totalAmount: formData.totalAmount,
      status: formData.paymentType === "paypal" ? "confirmed" : "pending",
      orderDate: new Date().toISOString(),
      marketingConsent: formData.marketingConsent,
      termsAccepted: formData.termsAccepted,
      ...(formData.paypalTransactionId && { paypalTransactionId: formData.paypalTransactionId }),
    }

    const result = await client.create(rentalOrder)

    if (!result._id) {
      throw new Error("Failed to create rental order")
    }

    revalidatePath("/rentals")
    return { success: true, orderId: result._id, orderNumber }
  } catch (error) {
    console.error("Error creating rental order:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create rental order",
      details: error,
    }
  }
}

