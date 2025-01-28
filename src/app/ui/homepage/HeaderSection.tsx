"use client";

import * as React from "react";
import { useState, useEffect } from "react";

export const HeaderSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the section after scrolling down 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex-1 shrink text-xl leading-8 w-[113px] max-md:hidden transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      Brotherhood<br />Service<br />Activism
    </div>
  );
};