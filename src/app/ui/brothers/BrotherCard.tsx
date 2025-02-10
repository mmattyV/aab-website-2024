import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrotherCardProps {
  id: string;
  first_name: string;
  last_name: string;
  house: string;
  position?: string;
  image_url?: string | null;
}

export const BrotherCard: React.FC<BrotherCardProps> = ({
  id,
  first_name,
  last_name,
  house,
  position,
  image_url,
}) => {
  return (
    <Link href={`/brothers/${id}/details`} passHref>
      {/* Outer container sets the aspect ratio & acts as a hover group */}
      <div
        className="
          relative flex-none basis-[230px] 
          aspect-[3/4] cursor-pointer
          group
        "
      >
        {/* Next.js Image (with fill) inside a position-relative container */}
        <Image
          src={image_url || "/placeholder.png"} 
          alt={`Profile of ${first_name} ${last_name}`}
          fill
          // Use object-cover to fill the entire area
          className="object-cover"
        />

        {/* Red overlay that appears on hover */}
        <div
          className="
            absolute inset-0 
            bg-brandRed 
            opacity-0
            group-hover:opacity-100 
            transition-opacity 
            duration-300 
            mix-blend-screen
          "
        />Argument of type 'Blob | Blob[]' is not assignable to parameter of type 'Blob | MediaSource'.
        Type 'Blob[]' is not assignable to type 'Blob | MediaSource'.
          Type 'Blob[]' is missing the following properties from type 'Blob': size, type, arrayBuffer, bytes, and 2 more.

        {/* Text overlay at bottom-left */}
        <div
          className="
            absolute bottom-4 left-4 
            text-white z-10 
            group-hover:text-white 
            transition-colors 
            duration-300
          "
        >
          <div className="text-3xl leading-none">
            {first_name} {last_name}
          </div>
          <div className="text-sm leading-loose">
            {/* If position is not "New Brother", show "house | position" */}
            {house}
            {position && position !== "New Brother" && ` | ${position}`}
          </div>
        </div>
      </div>
    </Link>
  );
};