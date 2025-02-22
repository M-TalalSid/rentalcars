"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift } from "lucide-react";
import Head from "next/head";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/dashboardss",
        redirect: false,
      });
      if (result?.error) {
        usetoast();
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      usetoast();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In - Your Company Name</title>
        <meta
          name="description"
          content="Sign in to your account using your preferred method."
        />
        <meta name="keywords" content="sign in, login, authentication" />
        <meta name="author" content="Your Company Name" />
        <link rel="canonical" href="https://yourwebsite.com/signin" />
      </Head>
      <div
        className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors focus:outline-none"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        <Card
          className={`w-[350px] transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                className={`w-full ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => handleSignIn("github")}
                disabled={isLoading}
              >
                <Gift className="mr-2 h-4 w-4" />
                Sign in with Github
              </Button>
              <Button
                variant="outline"
                className={`w-full ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => handleSignIn("google")}
                disabled={isLoading}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span
                    className={`w-full border-t ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span
                    className={`px-2 ${
                      darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"
                    }`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  className={darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className={darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${
                darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

function usetoast() {
  throw new Error("Function not implemented.");
}