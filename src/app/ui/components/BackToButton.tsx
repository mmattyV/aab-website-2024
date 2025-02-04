"use client"; // ✅ Ensure this runs as a Client Component

import { useRouter } from "next/navigation";
import { BackToButtonProps } from "@/app/lib/definitions";

export default function BackToButton({ text, subText, icon }: BackToButtonProps) {
    const router = useRouter();
  
    return (
      <button
        onClick={() => router.push("/brothers")}
        className="flex flex-col justify-center px-0.5 py-2 bg-white min-h-[124px] w-[223px] cursor-pointer 
                   transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      >
        <div className="flex items-center">
          <div className="flex gap-2.5 items-center self-stretch p-2.5 my-auto w-[111px]">
            <img
              loading="lazy"
              src={icon}
              alt=""
              className="object-contain self-stretch my-auto aspect-square w-[91px] transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="flex flex-col self-stretch my-auto leading-8 text-black w-[101px]">
            <div className="text-sm">{text}</div>
            <div className="mt-1 text-base">{subText}</div>
          </div>
        </div>
      </button>
    );
  }