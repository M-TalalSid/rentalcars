"use client";

import Link from "next/link";
import Chatbot from "../components/Chat-Bot";
import FAQ from "../components/FAQ";
import { useState } from "react";

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const categorizedFaqs: {
    [key: string]: { question: string; answer: string }[];
  } = {
    Booking: [
      {
        question: "Can I book a car in advance?",
        answer:
          "Yes, you can book a car in advance through our website or mobile app.",
      },
      {
        question: "What are the requirements to rent a car?",
        answer:
          "To rent a car, you must be at least 21 years old (age may vary by location), have a valid driver's license, and provide a credit card for payment.",
      },
      {
        question: "Can I return the car to a different location?",
        answer:
          "Yes, we offer one-way rentals. Please select the 'return to a different location' option while booking. Additional fees may apply.",
      },
      {
        question: "Are there mileage limits for the rental cars?",
        answer:
          "Most of our rentals come with unlimited mileage. However, some vehicle categories may have mileage restrictions. Check your rental terms for more details.",
      },
    ],
    Payments: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards and some debit cards.",
      },
    ],
    Policies: [
      {
        question: "What is the cancellation policy?",
        answer:
          "You can cancel up to 24 hours before the pickup time for a full refund.",
      },
      {
        question: "Do you offer insurance for rental cars?",
        answer:
          "Yes, we offer various insurance packages to cover damages, theft, and personal liability. You can choose a package during booking or at the pickup location.",
      },
      {
        question: "Can I add an additional driver to my rental?",
        answer:
          "Yes, you can add additional drivers to your rental. They must meet the rental requirements and may incur an extra fee.",
      },
    ],
  };

  const handleFeedback = (isPositive: unknown) => {
    alert(
      isPositive ? "Thank you for your feedback!" : "We're sorry to hear that."
    );
  };

  const filteredFaqs: {
    [key: string]: (typeof categorizedFaqs)[keyof typeof categorizedFaqs];
  } = Object.entries(categorizedFaqs).reduce(
    (
      acc: {
        [key: string]: (typeof categorizedFaqs)[keyof typeof categorizedFaqs];
      },
      [category, faqs]
    ) => {
      const filtered = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) acc[category] = filtered;
      return acc;
    },
    {}
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-100 to-gray-200"
      } p-6`}
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <span className="text-gray-700 dark:text-gray-200">
              Help Center
            </span>
          </nav>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Help Center
        </h1>
        <input
          type="text"
          placeholder="Search for a question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {Object.keys(filteredFaqs).length > 0 ? (
          Object.entries(filteredFaqs).map(([category, faqs]) => (
            <div key={category} className="mb-6">
              <h2
                onClick={() =>
                  setVisibleCategories((prev) => ({
                    ...prev,
                    [category]: !prev[category],
                  }))
                }
                className="cursor-pointer text-xl font-semibold text-gray-800 dark:text-gray-200"
              >
                {category}
                {visibleCategories[category] ? (
                  <span className="ml-2">▼</span>
                ) : (
                  <span className="ml-2">▶</span>
                )}
              </h2>
              {visibleCategories[category] &&
                faqs.map((faq, index) => (
                  <FAQ
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    onFeedback={handleFeedback}
                  />
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No FAQs Match Your Search Query.
          </p>
        )}

        {/* Call to Action */}
        <div className="mt-10 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            Still Have Questions?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <a
              href="tel:+123456789"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800"
            >
              <span className="mr-2">📞</span> Call Support
            </a>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg shadow hover:shadow-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Chatbot Integration */}
        <div className="mt-10">
          <Chatbot />
        </div>
    </div>
    </div>
  );  
};

export default HelpCenter;