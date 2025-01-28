import * as React from "react";
import { MenuButton } from "./MenuButton";
import { HeaderSection } from "@/app/ui/homepage/HeaderSection";

export const Header: React.FC = () => (
  <div className="flex z-50 fixed top-0 left-0 w-full gap-10 justify-between items-center py-5 px-10">
    <div className="flex items-center gap-10 text-white whitespace-nowrap max-sm:w-auto max-sm:grow-0">
      <div className="shrink-0 text-5xl font-bold px-3 max-md:text-4xl">AAB</div> {/* Adjusted container */}
      <HeaderSection />
    </div>
    <MenuButton text="MENU" icon="/hamburger-menu.svg" />
  </div>
);