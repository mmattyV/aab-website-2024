import * as React from "react";
import Image from "next/image";
import { MenuButtonProps } from "@/app/lib/types";

export const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex gap-4 items-center px-6 py-4 mx-10 bg-white min-h-[55px] rounded-[40px] w-[139px] max-md:px-4 max-md:w-auto max-md:mx-4"
  >
    {/* Icon Container */}
    <div className="flex items-center justify-center flex-shrink-0 w-[24px] h-[24px]">
      <Image
        src={icon}
        alt={text || "menu icon"}
        width={21}
        height={21}
        className="object-contain"
      />
    </div>

    {/* Text Container */}
    <div className="flex-1 text-xl whitespace-nowrap text-zinc-700 max-sm:hidden">
      {text}
    </div>
  </button>
);