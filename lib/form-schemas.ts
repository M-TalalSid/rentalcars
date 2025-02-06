import * as z from "zod"

export const rentalFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  pickupDate: z.date({
    required_error: "Pickup date is required",
  }),
  dropoffDate: z.date({
    required_error: "Drop-off date is required",
  }),
  paymentType: z.enum(["credit-card", "paypal", "bitcoin"]),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  marketingEmails: z.boolean(),
  termsAndConditions: z.boolean(),
})

export type RentalFormValues = z.infer<typeof rentalFormSchema>

