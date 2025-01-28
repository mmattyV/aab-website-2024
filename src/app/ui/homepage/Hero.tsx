import * as React from "react";
import { HeroProps } from "@/app/lib/types";

export const Hero: React.FC<HeroProps> = ({ backgroundImage }) => (
  <div
    className="relative w-full text-center text-white bg-center bg-no-repeat bg-cover bg-zinc-300 min-h-[857px] max-md:px-5 max-md:max-w-full"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    {/* Overlay for adjusting opacity */}
    <div
      className="absolute inset-0 w-full h-full bg-black opacity-20"
      style={{
        mixBlendMode: "multiply", // Ensures the overlay blends with the image
      }}
    ></div>

    {/* Text at the bottom */}
    <div
      className="absolute bottom-0 w-full px-4 leading-none overflow-hidden text-9xl max-md:text-6xl max-sm:text-5xl break-words"
      style={{
        lineHeight: "1",
        marginBottom: "-0.2em", // Ensures alignment with the bottom
      }}
    >
      ASIAN AMERICAN<br />BROTHERHOOD
    </div>
  </div>
);