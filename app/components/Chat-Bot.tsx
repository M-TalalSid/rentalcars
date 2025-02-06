"use client";

import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  interface Message {
    user: boolean;
    text: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: true, text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("/api/chatbot", { message: input });
      setMessages([...newMessages, { user: false, text: response.data.reply }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages([
        ...newMessages,
        { user: false, text: "Sorry, something went wrong. Try again later." },
      ]);
    }
  };

  return (
    <div className="chatbot bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="chatbot-messages h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.user
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;