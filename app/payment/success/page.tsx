"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode with localStorage and system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>Payment Successful - Your Company Name</title>
        <meta
          name="description"
          content="Your payment was successful. Thank you for choosing us for your rental needs."
        />
        <meta name="keywords" content="payment success, booking confirmed, rental confirmation" />
        <meta name="author" content="Your Company Name" />
        <link rel="canonical" href="https://yourwebsite.com/payment-success" />
      </Head>
      <div
        className={`min-h-screen flex flex-col justify-center items-center p-4 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full transition-colors duration-300 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank You For Your Rental. Your Booking Has Been Confirmed And You Will Receive A
            Confirmation Email Shortly.
          </p>
          <div className="space-y-4">
            <Link href="/" className="block">
              <button
                className={`w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors ${
                  darkMode ? "hover:bg-blue-700" : ""
                }`}
              >
                Return To Home
              </button>
            </Link>
            <Link href="/tracking" className="block">
              <button
                className={`w-full border border-blue-500 text-blue-500 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors ${
                  darkMode
                    ? "text-blue-400 border-blue-400 hover:bg-gray-700"
                    : "hover:bg-blue-50"
                }`}
              >
                View Booking Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}