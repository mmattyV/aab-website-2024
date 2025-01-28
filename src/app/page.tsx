import * as React from "react";
import { Hero } from "@/app/ui/homepage/Hero";
import { Mission } from "@/app/ui/homepage/Mission";
import { Pillar } from "@/app/ui/homepage/Pillar";
import { Footer } from "@/app/ui/homepage/Footer";

const pillarsData = [
  {
    title: "Service",
    description: "AAB believes that the collective organization of passionate individuals serves best to foster a culture of service and transform communities. Whether we are preparing the Harvard Square Homeless Shelter to open its doors for the season, cleaning along the Charles River, or going on Habitat for Humanity builds, we regularly engage in projects to improve the environment and institutions around us. AAB is committed to working with any and all groups who wish to create a more vibrant community based on civic participation and collaborative partnerships.",
    backgroundImage: "https://cdn.builder.io/api/v1/image/assets%2F022aeb8394de414c8f72066698fabbbc%2F48f9519bca1f45b5bfffd9f7e804a5ca"
  },
  {
    title: "Brotherhood",
    description: "Since its founding, AAB has guided dozens of young men through their undergraduate careers at Harvard. The group's horizontal structure ensures that every voice is respected, and our close-knit membership provides every member the opportunity to be an active and contributing force within the organization. At its core, AAB is committed to exploring the often neglected issue of Asian American masculinity. We embody the ideal that demographics of all colors and genders should be represented in leadership during and after our time at Harvard.",
    backgroundImage: "https://cdn.builder.io/api/v1/image/assets%2F022aeb8394de414c8f72066698fabbbc%2F3aff4fb44d134f91b2a3aa0cc51b876e"
  },
  {
    title: "Activism",
    description: "Our organization is also a force for political and social consciousness. AAB joins a rich history of ethnic organization on Harvard's campus, promoting discussions on the state of Asian-America through political, cultural, migratory, and even culinary and medical perspectives. AAB is proud to host Reflections, an end-of-year celebration of graduating seniors who have made significant contributions to Asian American community. To raise awareness of Asian American politicians, musical artists, cultural icons, and journalists, AAB has invited to campus many leaders within our community.",
    backgroundImage: "https://cdn.builder.io/api/v1/image/assets%2F022aeb8394de414c8f72066698fabbbc%2Fde1c1ae63d924472bc86daad248464e5"
  }
];

export default function Page() {
  return (
    <div className="flex overflow-hidden flex-col pt-0 pb-20 bg-black">
      <Hero backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F022aeb8394de414c8f72066698fabbbc%2F71fbdeddbc70419f80b3627e9e3c819a" />
      <Mission text="We, the brothers of the Asian American Brotherhood, have united ourselves in order to forge a stronger sense of unity among Asian Americans in our community and to foster solidarity without coercion. In promoting understanding and bonds across ethnic lines, the Asian American Brotherhood seeks to empower both our members and the communities that we serve." />
      
      <div className="gap-2.5 self-start py-2.5 pr-16 pl-14 mt-32 text-8xl text-white max-md:px-10 max-md:mt-10 max-md:max-w-full max-md:text-6xl">
        Three Pillars
      </div>

      <div className="flex flex-col mt-7 w-full text-white max-md:mt-0 max-md:max-w-full">
        {pillarsData.map((pillar, index) => (
          <Pillar
            key={index}
            {...pillar}
            additionalClasses={index === 0 ? "mt-10" : "mt-52"} // Adjust first vs. other Pillars
          />
        ))}
      </div>

      <Footer 
        year={2025}
        logo="https://cdn.builder.io/api/v1/image/assets/TEMP/e84eedf61660ebca754ac4d1b0e6fa0133b1a60f3cc0ff1c5755efdde932e9fc?placeholderIfAbsent=true&apiKey=022aeb8394de414c8f72066698fabbbc"
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e6d02221d5e7dcb35f36a7bdcbc6dd4062071219ce4243d7d1737a240d5f7f96?placeholderIfAbsent=true&apiKey=022aeb8394de414c8f72066698fabbbc"
      />
    </div>
  );
}