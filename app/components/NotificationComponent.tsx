import type React from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

interface NotificationProps {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: (id: string) => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`p-4 rounded shadow-lg flex items-center justify-between ${typeStyles[type]}`}
      >
        <span>{message}</span>
        <button onClick={() => onClose(id)} className="ml-4">
          <AiOutlineClose className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;