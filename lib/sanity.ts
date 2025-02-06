import { createClient } from "@sanity/client"

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set")
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("NEXT_PUBLIC_SANITY_DATASET is not set")
}

if (!process.env.SANITY_API_TOKEN) {
  throw new Error("SANITY_API_TOKEN is not set")
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-02-05", // Use today's date
  token: process.env.SANITY_API_TOKEN,
  useCdn: true, // Set to false to ensure fresh data
})

// Validate the connection
export async function validateSanityConnection() {
  try {
    // Try to fetch a single document to validate connection
    await client.fetch('*[_type == "rental"][0]')
    console.log("Sanity connection successful")
    return true
  } catch (error) {
    console.error("Sanity connection error:", error)
    return false
  }
}


export const PRODUCT_QUERY = `
*[_type == "car" && "popular" in tags || "recommended" in tags] {
  name,
  brand,
  type,
  fuelCapacity,
  transmission,
  seatingCapacity,
  pricePerDay,
  originalPrice,
  "imageUrl": image.asset->url
}
`

export const CUSTOMERS_QUERY = `
*[_type == "customer"] {
  _id,
  name,
  email,
  status,
  lastOrder
}
`

export const ORDERS_QUERY = `
*[_type == "order"] | order(_createdAt desc) {
  _id,
  customer->{
    name,
    email
  },
  products[]->{
    name,
    pricePerDay
  },
  status,
  _createdAt,
  totalAmount
}
`

