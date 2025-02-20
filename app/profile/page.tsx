"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import Spinner from "../components/Spinner"; // Create a Spinner component or use a library

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("Logged Out Successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error); // Log the error
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-transparent hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-500"
      >
        <h1 className="mt-6 text-4xl font-bold text-center text-gray-900 dark:text-white">
          Your Profile
        </h1>
        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <Image
              src={user.image || "/profilepic.jpg"}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-500"
              priority // Prioritize loading the profile image
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Log out"
            >
              {isLoading ? <Spinner /> : "Log out"}
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}