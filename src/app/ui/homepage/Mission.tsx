import * as React from "react";
import { MissionProps } from "@/app/lib/types";
import { ActionButton } from "./ActionButton";

export const Mission: React.FC<MissionProps> = ({ text }) => (
  <div className="flex flex-wrap gap-12 items-start px-16 mt-32 max-w-full w-[822px] max-md:px-5 max-md:mt-10">
    <div className="grow shrink gap-2.5 self-stretch py-2.5 text-4xl text-white min-w-[240px] w-[659px] max-md:px-5 max-md:max-w-full">
      {text}
    </div>
    <ActionButton text="CONSTITUTION" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4d6f0e92f94b2b02a98af26897cbb6eac4535e9eefafa4b12138c3428568cd1f?placeholderIfAbsent=true&apiKey=022aeb8394de414c8f72066698fabbbc" />
    <ActionButton text="BROTHERS" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4d6f0e92f94b2b02a98af26897cbb6eac4535e9eefafa4b12138c3428568cd1f?placeholderIfAbsent=true&apiKey=022aeb8394de414c8f72066698fabbbc" />
  </div>
);