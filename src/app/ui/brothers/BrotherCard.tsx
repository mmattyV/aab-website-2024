import * as React from "react";
import { BrotherCardProps } from "@/app/lib/types";

export const BrotherCard: React.FC<BrotherCardProps> = ({ name, house }) => {
  return (
    <div className="flex flex-col grow shrink self-stretch px-7 pt-72 pb-6 my-auto min-h-[392px] min-w-[240px] w-[230px] max-md:px-5 max-md:pt-24">
      <div className="text-3xl leading-none">{name}</div>
      <div className="mt-8 text-sm leading-loose">{house}</div>
    </div>
  );
};