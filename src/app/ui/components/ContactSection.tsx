import * as React from "react";
import { ContactInfo } from "@/app/lib/definitions";
import Image from 'next/image';

interface ContactSectionProps {
  contacts: ContactInfo[];
}

export function ContactSection({
  contacts,
  firstName,
}: ContactSectionProps & { firstName: string }) {
  return (
    <div className="flex flex-col mt-60 max-w-5xl w-full max-md:mt-10">
      <div className="text-3xl leading-none max-md:max-w-full">
        GET IN TOUCH WITH {firstName.toLocaleUpperCase()}
      </div>
      {/* Ensure the contacts are in a row but wrap when needed */}
      <div className="flex flex-wrap gap-5 items-center justify-start mt-5 w-full text-xl">
        {contacts.map((contact, index) => {
          // Determine appropriate href
          let href = "#";
          if (contact.text.includes("@") && contact.alt.toLowerCase().includes("email")) {
            href = `mailto:${contact.text}`;
          } else if (contact.alt.toLowerCase().includes("instagram")) {
            href = `https://instagram.com/${contact.text.replace("@", "")}`;
          } else if (contact.alt.toLowerCase().includes("phone")) {
            href = `tel:${contact.text.replace(/\D/g, "")}`; // Removes non-numeric characters for tel links
          }

          return (
            <div
              key={index}
              className="flex gap-2.5 items-center min-w-[180px] max-w-full"
            >
              <Image
                loading="lazy"
                src={contact.icon}
                alt={contact.alt}
                className="object-contain shrink-0 w-7 aspect-square"
                width={50}
                height={50}
              />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 underline-offset-8 hover:text-brandRed"
              >
                {contact.text}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}