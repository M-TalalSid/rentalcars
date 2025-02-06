import { validateSanityConnection } from "../lib/sanity"

async function main() {
  console.log("Validating Sanity connection...")
  const isValid = await validateSanityConnection()

  if (isValid) {
    console.log("✅ Sanity connection is working properly")
    process.exit(0)
  } else {
    console.error("❌ Sanity connection failed")
    process.exit(1)
  }
}

main().catch(console.error)

