import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Sanity client setup
const sanityClient = createClient({
  projectId: "wc9r8g31", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2025-02-05", // Replace with your preferred API version
  useCdn: true, // Use true for faster reads if no need for fresh data
});
// GROQ query to fetch products
const PRODUCT_QUERY = `
  *[_type == "car" && "popular" in tags] {
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
`;
//Codeium: Refactor | Explain | Generate JSDoc | X
export async function GET() {
  try {
    // Fetch data from Sanity
    const products = await sanityClient.fetch(PRODUCT_QUERY);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
