"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type User = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  googleLogin: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user && "id" in session.user) {
      setUser({
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name as string,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string) => {
    // In a real application, you would make an API call here.
    // For this example, we'll simulate a successful login.
    const user = { id: "1", email, name: "John Doe" };
    setUser(user);
  };

  const signup = async (email: string, _password: string, name: string) => {
    // In a real application, you would make an API call here.
    // For this example, we'll simulate a successful signup.
    const user = { id: "1", email, name };
    setUser(user);
  };

  const logout = () => {
    signOut();
  };

  const googleLogin = async () => {
    await signIn("google");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
