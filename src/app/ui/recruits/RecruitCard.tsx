import * as React from "react";
import { RecruitCardProps } from "@/app/lib/definitions";

export const RecruitCard: React.FC<RecruitCardProps> = ({ name, house, profileImage }) => {
  return (
    <div 
      className="relative flex-none basis-[230px] aspect-[3/4] bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${profileImage})`,
      }}
    >
      {/* Text Container Positioned at Bottom Left */}
      <div className="absolute bottom-4 left-4 text-white">
        <div className="text-3xl leading-none">{name}</div>
        <div className="text-sm leading-loose">{house}</div>
      </div>
    </div>
  );
};