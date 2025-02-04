"use client";

import * as React from "react";
import BackToButton from "@/app/ui/components/BackToButton";
import { ContactSection } from "@/app/ui/components/ContactSection";
import { BrotherProfileProps, ContactInfo } from "@/app/lib/definitions";

function formatDate(date: string | Date | null | undefined) {
  if (!date) return "Not provided";
  if (typeof date === "string") return date;
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
}

export function BrotherProfile({
  first_name = "Unknown",
  last_name = "",
  personal_email = "",
  school_email = "",
  brother_name = "",
  house = "",
  year = 0,
  birthday = "",
  location = "",
  phone = "",
  tagline = "",
  position = "",
  bio = "",
  instagram = "",
  image_url = "https://via.placeholder.com/150",
}: BrotherProfileProps) {
  const contacts: ContactInfo[] = [
    personal_email && { icon: "/email-r-icon.svg", text: personal_email, alt: "Personal email" },
    school_email && { icon: "/email-r-icon.svg", text: school_email, alt: "School email" },
    instagram && { icon: "/instagram-icon.svg", text: `@${instagram}`, alt: "Instagram" },
    phone && { icon: "/phone-icon.svg", text: phone, alt: "Phone" },
  ].filter(Boolean) as ContactInfo[];

  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = React.useState(false);

  React.useEffect(() => {
    const checkWrapping = () => {
      if (!containerRef.current || !buttonRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = [...containerRef.current.children].reduce(
        (total, child) => total + (child as HTMLElement).offsetWidth,
        0
      );

      setIsWrapped(contentWidth > containerWidth);
    };

    // Run once on mount
    checkWrapping();

    // Re-run when the window resizes
    window.addEventListener("resize", checkWrapping);
    return () => window.removeEventListener("resize", checkWrapping);
  }, []);

  return (
    <div className="flex overflow-hidden flex-col py-80 bg-black max-md:py-24">
      <div className="flex flex-col ml-16 max-w-full text-left text-white w-[610px]">
        <div className="gap-2.5 p-2.5 text-2xl max-md:max-w-full text-left w-full">
          {year} | {house} | {position}
        </div>
        <div className="gap-2.5 mt-6 w-full text-8xl max-md:max-w-full max-md:text-4xl text-left">
          {first_name} {last_name}
        </div>
      </div>
      <div ref={containerRef} className="flex flex-wrap gap-10 items-start mt-12 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-9 items-start min-w-[240px] max-md:max-w-full">
          <div className="flex gap-2.5 items-start pr-2.5 pt-[27px] min-w-[240px] w-[507px] max-md:max-w-full">
            <img
              loading="lazy"
              src={image_url}
              alt={`Profile photo of ${first_name} ${last_name}`}
              className="object-contain aspect-[0.75] min-w-[240px] w-[487px]"
            />
          </div>
          <div className="flex flex-col self-stretch my-auto text-white min-w-[240px] w-[604px] max-md:max-w-full">
            <div className="flex flex-col items-start w-full text-2xl max-md:max-w-full text-left">
              <div className="gap-2.5 self-stretch p-2.5 mt-4 text-4xl leading-8 max-md:max-w-full">
                {tagline || "No tagline available"}
              </div>
              <div className="gap-2.5 self-stretch p-2.5 mt-1 w-full text-xl leading-8 max-md:max-w-full">
                {bio || "No bio available"}
              </div>
              <div className="gap-2.5 self-stretch p-2.5 mt-1 text-left">
                Hometown: {location || "Unknown"}
              </div>
              <div className="gap-2.5 self-stretch p-2.5 mt-1 text-left">
                Birthday: {formatDate(birthday)}
              </div>
              <div className="gap-2.5 self-stretch p-2.5 mt-1 text-left">
                Brother Name: {brother_name || "N/A"}
              </div>
            </div>
            <ContactSection contacts={contacts} firstName={first_name} />
          </div>
        </div>
        {/* BackToButton now properly disappears when wrapping happens */}
        <div ref={buttonRef} className={`${isWrapped ? "hidden" : "flex"}`}>
          <BackToButton
            text="Back"
            subText="TO BROTHERS"
            icon="/top-left-arrow.svg"
          />
        </div>
      </div>
    </div>
  );
}