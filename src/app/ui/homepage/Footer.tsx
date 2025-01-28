import * as React from "react";
import { FooterProps } from "@/app/lib/types";

export const Footer: React.FC<FooterProps> = ({ year, logo, icon }) => (
  <div className="flex flex-col items-center self-center mt-20 max-w-full text-sm font-bold tracking-widest text-center text-white w-[326px] max-md:mt-10">
    <img
      loading="lazy"
      src={logo}
      alt="AAB Logo"
      className="object-contain max-w-full aspect-[1.73] w-[178px]"
    />
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="object-contain mt-6 rounded-none aspect-[1.55] w-[35px]"
    />
    <div className="self-stretch mt-6">
      {year} © AAB | ALL RIGHTS RESERVED
    </div>
  </div>
);