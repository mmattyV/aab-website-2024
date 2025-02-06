"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Underline } from "@/app/ui/components/Underline";

const validTabs = ["ALL", "BAPTIZED", "UNBAPTIZED"];

export default function RecruitFilterTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeTab = searchParams.get("tab") || "ALL";

  function handleTabClick(tab: string) {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <nav className="flex gap-7 items-center pl-3 text-xl max-md:text-base text-black" role="navigation">
      {validTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`focus:outline-none leading-none hover:text-brandRed transition-colors duration-200 ${
            activeTab === tab ? "text-brandRed font-semibold" : "text-black"
          }`}
        >
          {tab}
          {activeTab === tab ? <Underline /> : <div className="h-[3px] w-full mt-[2px]" />}
        </button>
      ))}
    </nav>
  );
}