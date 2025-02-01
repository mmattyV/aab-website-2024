import * as React from "react";
import { BrotherYearSection } from "@/app/ui/brothers/BrotherYearSection";
import { BrotherYearSectionProps } from "@/app/lib/types";
import { Underline } from "@/app/ui/components/Underline";

const brothersData: BrotherYearSectionProps[] = [
  {
    year: "2025",
    brothers: [
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" }
    ]
  },
  {
    year: "2025",
    brothers: [
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" }
    ]
  },
  {
    year: "2025",
    brothers: [
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" },
      { name: "Matthew Kim", house: "Cabot House", profileImage: "/profile-image.jpg" }
    ]
  }
];

export default function Page() {
  return (
    <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
      <div className="gap-2.5 self-start p-2.5 ml-12 text-9xl text-white max-md:max-w-full max-md:text-6xl max-md:ml-[22px] max-sm:text-4xl">
        OUR BROTHERS
      </div>
      <div className="flex flex-col items-start px-14 pt-12 pb-40 mt-32 w-full bg-white max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
        <nav className="flex gap-7 items-center pl-3 text-xl max-md:text-base text-black" role="navigation">
          {/* Wrap each button and its underline to ensure alignment */}
          <div className="flex flex-col items-center">
            <button className="focus:outline-none leading-none" tabIndex={0}>
              ALL
            </button>
            <Underline />
          </div>
          <div className="flex flex-col items-center">
            <button className="focus:outline-none leading-none" tabIndex={0}>
              BOARD
            </button>
            <div className="h-[3px] w-full invisible mt-[2px]" /> {/* Keeps spacing equal for alignment */}
          </div>
          <div className="flex flex-col items-center">
            <button className="focus:outline-none leading-none" tabIndex={0}>
              ALUMS (coming soon)
            </button>
            <div className="h-[3px] w-full invisible mt-[2px]" /> {/* Keeps spacing equal for alignment */}
          </div>
        </nav>
        {brothersData.map((yearSection, index) => (
          <BrotherYearSection key={index} {...yearSection} />
        ))}
      </div>
    </div>
  );
};