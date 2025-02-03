import * as React from "react";
import { BrotherCardProps } from "@/app/lib/definitions";
import Link from "next/link"; // For Next.js routing

export const BrotherCard: React.FC<BrotherCardProps> = ({
  first_name,
  last_name,
  house,
  position,
  image_url,
}) => {
  return (
    <Link
      href={`/brother-profile/${encodeURIComponent(first_name + last_name)}`}
      passHref
    >
      <div
        className="relative flex-none basis-[230px] aspect-[3/4] bg-center bg-no-repeat bg-cover cursor-pointer
                   transition-all duration-300 group"
        style={{
          backgroundImage: `url(${image_url})`,
        }}
      >
        {/* Overlay to force the hover effect on both image and text */}
        <div className="absolute inset-0 bg-brandRed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"></div>

        {/* Text Container Positioned at Bottom Left, Always White */}
        <div className="absolute bottom-4 left-4 text-white z-10 group-hover:text-white transition-colors duration-300">
          <div className="text-3xl leading-none">
            {first_name + " " + last_name}
          </div>
          <div className="text-sm leading-loose">
            {house + (position !== "New Brother" ? ` | ${position}` : ``)}
          </div>
        </div>
      </div>
    </Link>
  );
};
