"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineBell, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Notification from "./NotificationComponent";
import { ThemeToggle } from "./Theme-Toggle";

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNotificationIconClick = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!mounted) return null;

  return (
    <nav className="max-w-[1440px] px-6 py-4 mx-auto bg-background flex items-center justify-between shadow-lg rounded-lg transition-all duration-200 relative">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold text-[#3563E9] tracking-wide">
        MORENT
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <button 
          onClick={handleNotificationIconClick} 
          className="text-xl text-muted-foreground hover:text-primary transition duration-150"
          aria-label="Notifications"
        >
          <AiOutlineBell />
        </button>
        <Link href="/help-center" className="flex items-center text-muted-foreground hover:text-primary transition duration-150">
          <FaQuestion className="mr-2" /> Help Center
        </Link>
        {user ? (
          <Link href="/profile">
            <Image
              src={user.image || "/profilepic.jpg"}
              alt="Profile"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover border-2 border-primary hover:scale-105 transition duration-150"
            />
          </Link>
        ) : (
          <Link href="/login" className="text-primary hover:text-primary-dark transition duration-150">
            Login
          </Link>
        )}
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu} 
        className="md:hidden text-2xl p-2"
        aria-label="Toggle Menu"
      >
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 ${menuOpen ? "block" : "hidden"} transition-opacity duration-300`}
        onClick={toggleMenu} 
      ></div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 w-2/3 h-full bg-background shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 flex flex-col items-center justify-center space-y-6 md:hidden z-50`}
      >
        {/* Close Button */}
        <button 
          onClick={toggleMenu}
          className="absolute top-5 right-5 text-3xl"
        >
          <AiOutlineClose />
        </button>

        <button 
          onClick={handleNotificationIconClick} 
          className="text-2xl text-muted-foreground hover:text-primary transition duration-150"
        >
          <AiOutlineBell />
        </button>
        <Link href="/help-center" className="text-lg text-muted-foreground hover:text-primary transition duration-150 flex items-center" onClick={toggleMenu}>
          <FaQuestion className="mr-2" /> Help Center
        </Link>
        {user ? (
          <Link href="/profile" onClick={toggleMenu}>
            <Image
              src={user.image || "/profilepic.jpg"}
              alt="Profile"
              width={50}
              height={50}
              className="w-12 h-12 rounded-full border-2 border-primary hover:scale-105 transition duration-150"
            />
          </Link>
        ) : (
          <Link href="/login" className="text-primary text-lg hover:text-primary-dark transition duration-150" onClick={toggleMenu}>
            Login
          </Link>
        )}
      </div>

      {/* Notification Component */}
      {showNotification && (
        <Notification message="No New Notifications!" type="info" onClose={() => setShowNotification(false)} id={""} />
      )}
    </nav>
  );
};

export default Navbar;
