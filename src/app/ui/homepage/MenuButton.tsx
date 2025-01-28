import * as React from "react";
import Image from "next/image";
import { MenuButtonProps } from "@/app/lib/types";

export const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex gap-4 items-center px-6 py-4 mx-10 bg-white min-h-[55px] rounded-[40px] w-[139px] max-md:px-5 max-md:mr-10"
  >
    <div className="flex flex-col self-stretch my-auto">
      <Image
        src={icon}
        alt={text || "menu icon"} // Use `text` as alt or fallback to "menu icon"
        width={32} // Increase the width
        height={32} // Use a square size for easier scaling
        className="object-contain" // Ensure the SVG maintains aspect ratio
      />
    </div>
    <div className="flex-1 shrink gap-2.5 self-stretch my-auto text-xl whitespace-nowrap text-zinc-700">
      {text}
    </div>
  </button>
);