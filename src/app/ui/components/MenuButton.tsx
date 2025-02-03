'use client';

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import { MenuButtonProps } from "@/app/lib/definitions";

export const MenuButton: React.FC<MenuButtonProps> = ({ text, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex gap-3 items-center px-5 py-4 mx-10 shadow bg-white min-h-[55px] rounded-[40px] w-[139px] max-md:px-4 max-md:w-auto max-md:mx-4"
      >
        <div className="flex items-center justify-center flex-shrink-0 w-[24px] h-[24px]">
          <Image
            src={icon}
            alt={text || "menu icon"}
            width={21}
            height={21}
            className="object-contain"
          />
        </div>
        <div className="flex-1 text-xl whitespace-nowrap text-zinc-700 max-sm:hidden">
          {text}
        </div>
      </button>

      {/* Side Navigation Bar */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-neutral-900 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-5 text-xl font-bold"
        >
          ✕
        </button>
        <nav className="flex flex-col mt-16 gap-4 px-6">
          {/* Homepage Link */}
          <Link href="/" className="text-lg hover:underline" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/brothers" className="text-lg hover:underline" onClick={toggleMenu}>
            Brothers
          </Link>
          <Link href="/recruits" className="text-lg hover:underline" onClick={toggleMenu}>
            Recruits
          </Link>
          <Link href="/" className="text-lg hover:underline" onClick={toggleMenu}>
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
};