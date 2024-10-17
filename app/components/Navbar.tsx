import React from "react";
import Image from 'next/image';
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-yellow-400 text-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
        <Image 
          src="/img/logo.png" 
          alt="Logo" 
          width={45} 
          height={45} 
          priority 
        />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link className="text-lg font-semibold hover:text-gray-700" href="/">
            Anasayfa
          </Link>
          <Link className="text-lg font-semibold hover:text-gray-700" href="/about">
            Hakkımızda
          </Link>
          <Link className="text-lg font-semibold hover:text-gray-700" href="/contact">
            İletişim
          </Link>
        </div>
        <button className="md:hidden flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
