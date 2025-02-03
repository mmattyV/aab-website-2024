import * as React from "react";
import Image from "next/image"; // Import Next.js Image component
import { FooterProps } from "@/app/lib/definitions";

export const Footer: React.FC<FooterProps> = ({ year, logo, icon }) => (
  <div className="flex flex-col items-center self-center mt-20 max-w-full text-sm font-bold tracking-widest text-center text-white w-[326px] max-md:mt-10">
    {/* Logo */}
    <Image
      src={logo}
      alt="AAB Logo"
      width={223}
      height={129}
      className="object-contain"
    />

    {/* Email Icon Button */}
    <a
      href="mailto:aa.brotherhood@gmail.com" // Replace with your email address
      aria-label="Send an email"
      className="mt-6"
    >
      <Image
        src={icon}
        alt="Email Icon"
        width={37} // Explicit width for optimization
        height={27} // Aspect ratio based on provided dimensions
        className="object-contain cursor-pointer"
      />
    </a>

    {/* Footer Text */}
    <div className="self-stretch mt-6">{year} © AAB | ALL RIGHTS RESERVED</div>
  </div>
);
