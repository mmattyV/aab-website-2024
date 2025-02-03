import * as React from "react";
import Image from "next/image"; // Import Next.js Image component
import { ActionButtonProps } from "@/app/lib/definitions";

export const ActionButton: React.FC<ActionButtonProps & { link: string }> = ({
  text,
  icon,
  link,
}) => (
  <a
    href={link}
    className="flex flex-col justify-center px-3 py-2 border border-solid border-stone-700 rounded-[40px] hover:bg-stone-800 transition"
    target="_blank" // Open the link in a new tab
    rel="noopener noreferrer" // Security best practice for external links
  >
    <div className="flex gap-4 justify-center items-center px-2">
      <div className="self-stretch my-auto text-xl text-white">{text}</div>
      <div className="flex flex-col justify-center items-center self-stretch pr-2.5 pl-2.5 my-auto w-9 h-9 bg-red-800 rounded-2xl min-h-[36px]">
        <Image
          src={icon}
          alt={text || "icon"} // Use the `text` prop or a default alt
          width={20}
          height={14}
          className="object-contain"
        />
      </div>
    </div>
  </a>
);
