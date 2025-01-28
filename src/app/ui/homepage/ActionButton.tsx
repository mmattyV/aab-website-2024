import * as React from "react";
import { ActionButtonProps } from "@/app/lib/types";

export const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col justify-center px-3 py-2 border border-solid border-stone-700 rounded-[40px]"
  >
    <div className="flex gap-4 justify-center items-center px-2">
      <div className="self-stretch my-auto text-xl text-white">{text}</div>
      <div className="flex flex-col justify-center items-center self-stretch pr-2.5 pl-2.5 my-auto w-9 h-9 bg-red-800 rounded-2xl min-h-[36px]">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain aspect-[1.42] w-[17px]"
        />
      </div>
    </div>
  </button>
);