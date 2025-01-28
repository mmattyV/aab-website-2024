import * as React from "react";
import { HeroProps } from "@/app/lib/types";

export const Hero: React.FC<HeroProps> = ({ backgroundImage }) => (
  <div
    className="relative w-full text-9xl text-center text-white bg-center bg-no-repeat bg-cover bg-zinc-300 min-h-[857px] max-md:px-5 max-md:max-w-full max-md:text-8xl max-sm:text-6xl"
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
      className="absolute bottom-0 w-full leading-none"
      style={{
        lineHeight: "1",
        marginBottom: "-0.2em", // Ensures alignment with the bottom
      }}
    >
      ASIAN AMERICAN<br />BROTHERHOOD
    </div>
  </div>
);