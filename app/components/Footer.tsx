import Link from "next/link";
import { FaDiscord, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-5 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left Section */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start gap-4">
            <h1 className="font-bold text-[32px] leading-10 tracking-tight text-[#3563E9] dark:text-blue-400">
              MORENT
            </h1>
            <p className="max-w-[289px] text-base text-opacity-[60%] text-[#080808] dark:text-gray-300 font-medium tracking-tight">
              Our Vision Is To Provide Convenience And Help Increase Your Sales Business
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 md:flex flex-wrap gap-10 md:gap-16 w-full md:w-auto">
            {/* About Section */}
            <div>
              <h1 className="font-semibold mb-4 text-lg md:text-xl text-[#3563E9] dark:text-blue-400 tracking-tight">About</h1>
              <ul className="space-y-4 md:space-y-6 text-base text-opacity-[60%] text-[#131313] dark:text-gray-300 font-medium tracking-tight">
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">How It Works</Link></li>
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Featured</Link></li>
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Partnership</Link></li>
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Business Relation</Link></li>
              </ul>
            </div>

            {/* Community Section */}
            <div>
              <h1 className="font-semibold mb-4 text-lg md:text-xl text-[#3563E9] dark:text-blue-400 tracking-tight">Community</h1>
              <ul className="space-y-4 md:space-y-6 text-base text-opacity-[60%] text-[#131313] dark:text-gray-300 font-medium tracking-tight">
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Events</Link></li>
                <li><Link href="https://sanity-blogwebsite.vercel.app" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Blog</Link></li>
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Podcast</Link></li>
                <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">Invite A Friend</Link></li>
              </ul>
            </div>

            {/* Socials Section */}
            <div>
              <h1 className="font-semibold mb-4 text-lg md:text-xl text-[#3563E9] dark:text-blue-400 tracking-tight">Socials</h1>
              <ul className="space-y-6 md:space-y-6 text-base text-opacity-[60%] text-[#131313] dark:text-gray-300 font-medium tracking-tight">
                <li className="flex"><Link href="https://www.discord.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><FaDiscord /> Discord</Link></li>
                <li className="flex"><Link href="https://www.instagram.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><FaInstagram /> Instagram</Link></li>
                <li className="flex"><Link href="https://www.twitter.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><FaTwitter /> Twitter</Link></li>
                <li className="flex"><Link href="https://www.facebook.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><FaFacebook /> Facebook</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-[#131313] dark:border-gray-700 border-opacity-[16%]" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm">
          <p className="text-base text-[#131313] dark:text-gray-300 font-medium tracking-tight">©2023 MORENT. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline text-base text-[#131313] dark:text-gray-300 font-medium tracking-tight transition-colors duration-300">
              Privacy & Policy
            </a>
            <a href="#" className="hover:underline text-base text-[#131313] dark:text-gray-300 font-medium tracking-tight transition-colors duration-300">
              Terms & Condition
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;