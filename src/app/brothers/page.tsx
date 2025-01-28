import * as React from "react";
import { YearSection } from "@/app/ui/brothers/YearSection";
import { YearSectionProps } from "@/app/lib/types";

const brothersData: YearSectionProps[] = [
  {
    year: "2025",
    brothers: [
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" }
    ]
  },
  {
    year: "2025",
    brothers: [
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" }
    ]
  },
  {
    year: "2025",
    brothers: [
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" },
      { name: "Matthew Kim", house: "Cabot House" }
    ]
  }
];

export default function Page() {
  return (
    <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
      <div className="gap-2.5 self-start p-2.5 ml-16 text-9xl text-center text-white max-md:max-w-full max-md:text-4xl">
        OUR BROTHERS
      </div>
      <div className="flex flex-col items-start px-14 pt-12 pb-40 mt-32 w-full bg-white max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
        <nav className="flex gap-7 items-center pl-3 text-xl text-black" role="navigation">
          <div className="flex flex-col self-stretch my-auto w-9 whitespace-nowrap">
            <button className="focus:outline-none" tabIndex={0}>ALL</button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/73911f32e7ff317cdf82aae9e70d9c9b253f3267c2c07630bea79d475f86f5f2?placeholderIfAbsent=true&apiKey=022aeb8394de414c8f72066698fabbbc"
              className="object-contain self-end w-9 aspect-[35.71]"
              alt=""
            />
          </div>
          <button className="self-stretch my-auto focus:outline-none" tabIndex={0}>BOARD</button>
          <button className="self-stretch my-auto focus:outline-none" tabIndex={0}>ALUMS (coming soon)</button>
        </nav>
        {brothersData.map((yearSection, index) => (
          <YearSection key={index} {...yearSection} />
        ))}
      </div>
    </div>
  );
};