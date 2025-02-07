import * as React from "react";
import BackToButton from "@/app/ui/components/BackToButton";
import Image from "next/image";
import { ContactSection } from "@/app/ui/components/ContactSection";
import { RecruitProfileProps, ContactInfo } from "@/app/lib/definitions";

export function RecruitProfile({
  id = "",
  first_name = "Unknown",
  last_name = "",
  email = "",
  phone = "",
  year = 0,
  room = "",
  image_url = "https://via.placeholder.com/150",
}: RecruitProfileProps) {
  const contacts: ContactInfo[] = [
    email && {
      icon: "/email-r-icon.svg",
      text: email,
      alt: "Personal email",
    },
    phone && {
      icon: "/phone-icon.svg",
      text: phone,
      alt: "Phone",
    },
  ].filter(Boolean) as ContactInfo[];

  console.log("Recruit id is: ", id);

  return (
    <div className="flex flex-col bg-black text-white overflow-hidden py-80 max-md:py-24">
      {/* Header Info (retains margin above position & name) */}
      <div className="flex flex-col text-left w-full pl-16 max-sm:center max-md:pl-8">
        <div className="text-2xl pl-4">
          {year} | {room}
        </div>
        <div className="mt-6 text-8xl max-md:text-6xl pl-3">
          {first_name} {last_name}
        </div>
      </div>

      {/* Single container: Image + Button + Text */}
      <div
        className="
          relative
          flex
          flex-col
          md:flex-row
          items-start
          gap-4
          mt-12
          max-md:mt-10
          max-md:max-w-full
          md:pr-52
        "
      >
        <Image
          src={image_url}
          alt={`Profile of ${first_name} ${last_name}`}
          width={487}
          height={650}
          className="
            object-contain
            w-full
            max-w-[487px]
            aspect-[0.75]
            min-w-[400px]
            max-md:mx-auto
          "
        />

        {/* Button: visible on md+ only, absolutely at top-right */}
        <div
          className="
            hidden
            md:block
            absolute
            top-0
            right-0
          "
        >
          <BackToButton
            text="Back"
            type="recruits"
            subText="TO RECRUITS"
            icon="/top-left-arrow.svg"
          />
        </div>

        {/* Text (tagline, bio, etc.) */}
        <div className="text-2xl ml-10 max-md:m-10">
          

          <div className="ml-2">
            <ContactSection contacts={contacts} firstName={first_name} />
          </div>
        </div>
      </div>
    </div>
  );
}