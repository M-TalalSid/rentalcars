"use client";

import { useSessionContext } from "../contexts/SessionContext";
import Link from "next/link";

export const ProfileButton = () => {
  const { session, loading } = useSessionContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <Link href="/profile">
        <button className="bg-primary text-white px-4 py-2 rounded">
          Profile
        </button>
      </Link>
    );
  }

  return (
    <Link href="/login">
      <button className="bg-primary text-white px-4 py-2 rounded">
        Log In
      </button>
    </Link>
  );
};