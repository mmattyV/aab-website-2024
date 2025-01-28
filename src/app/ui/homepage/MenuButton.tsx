import * as React from "react";
import { MenuButtonProps } from "@/app/lib/types";

export const MenuButton: React.FC<MenuButtonProps> = ({ text, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex gap-4 items-center px-6 py-4 mx-10 bg-white min-h-[55px] rounded-[40px] w-[139px] max-md:px-5 max-md:mr-10"
  >
    <div className="flex flex-col self-stretch my-auto w-[17px]">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain aspect-[1.55] fill-zinc-900 w-[17px]"
      />
    </div>
    <div className="flex-1 shrink gap-2.5 self-stretch my-auto text-xl whitespace-nowrap text-zinc-700 w-[58px]">
      {text}
    </div>
  </button>
);