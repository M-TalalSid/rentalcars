import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQProps {
  question: string;
  answer: string;
  onFeedback: (feedback: boolean) => void;
}

const FAQ: React.FC<FAQProps> = React.memo(({ question, answer, onFeedback }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="border-b border-gray-300 py-4 transition-all duration-300">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{question}</h2>
        <span className="text-gray-500 dark:text-gray-400">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div
        id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`mt-2 text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {isOpen && <p>{answer}</p>}
      </div>
      {isOpen && (
        <div className="mt-2 text-sm">
          <p className="mb-1">Was This Helpful?</p>
          <button
            onClick={() => onFeedback(true)}
            className="mr-4 text-green-500 hover:text-green-700 focus:outline-none"
          >
            👍 Yes
          </button>
          <button
            onClick={() => onFeedback(false)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            👎 No
          </button>
        </div>
      )}
    </article>
  );
});

export default FAQ;