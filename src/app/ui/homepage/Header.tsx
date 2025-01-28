import * as React from "react";
import { MenuButton } from "./MenuButton";
import { HeaderSection } from "@/app/ui/homepage/HeaderSection";

export const Header: React.FC = () => (
  <div className="flex z-50 fixed top-0 left-0 w-full gap-10 justify-between items-center py-5 px-10">
    <div className="flex gap-10 items-center text-white whitespace-nowrap min-w-[240px] max-sm:w-auto max-sm:grow-0">
      <div className="flex-1 shrink text-5xl font-bold px-5 max-md:text-4xl">AAB</div> {/* Added font-bold */}
      <HeaderSection />
    </div>
    <MenuButton text="MENU" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/6f80b1c2787d9b72c7362f62ce2f7cb553d642fe03a3fd61bfb9b908ad4a6984?placeholderIfAbsent=true&apiKey=022aeb8394de414c8f72066698fabbbc" />
  </div>
);