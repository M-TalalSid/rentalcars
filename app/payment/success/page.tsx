import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank You For Your Rental. Your Booking Has Been Confirmed And You Will Receive A Confirmation Email Shortly.
        </p>
        <div className="space-y-4">
          <Link href="/" className="block">
            <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
              Return To Home
            </button>
          </Link>
          <Link href="/tracking" className="block">
            <button className="w-full border border-blue-500 text-blue-500 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
              View Booking Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

