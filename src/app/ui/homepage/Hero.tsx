import * as React from "react";
import { HeroProps } from "@/app/lib/definitions";

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

    {/* Text at the bottom, centered horizontally */}
    <div
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-4 text-9xl max-md:text-6xl max-sm:text-5xl leading-none"
    >
      ASIAN AMERICAN
      <br />
      BROTHERHOOD
    </div>
  </div>
);