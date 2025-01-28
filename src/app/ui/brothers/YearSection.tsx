import * as React from "react";
import { BrotherCard } from "./BrotherCard";
import { YearSectionProps } from "@/app/lib/types";

export const YearSection: React.FC<YearSectionProps> = ({ year, brothers }) => {
  return (
    <div className="flex flex-col mt-9 max-w-full w-[1290px]">
      <div className="gap-2.5 self-start p-2.5 text-5xl text-black whitespace-nowrap max-md:text-4xl">
        {year}
      </div>
      <div className="flex flex-wrap gap-11 items-center pl-3 mt-3 w-full text-white max-md:max-w-full">
        {brothers.map((brother, index) => (
          <BrotherCard key={index} {...brother} />
        ))}
      </div>
    </div>
  );
};