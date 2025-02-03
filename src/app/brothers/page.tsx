import { Suspense } from "react";
import BrotherSectionWrapper from "@/app/ui/brothers/BrotherSectionWrapper";
import { Underline } from "@/app/ui/components/Underline";
import { redirect } from "next/navigation";

// ✅ Use `generateMetadata()` to correctly access searchParams
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  return { searchParams };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  // ✅ Use `await` to correctly handle searchParams
  const params = await searchParams;
  const activeTab = params?.tab || "ALL";

  // ✅ Prevent invalid tab values
  const validTabs = ["ALL", "BOARD"];
  if (!validTabs.includes(activeTab)) {
    redirect("/brothers?tab=ALL"); // Redirect to default tab
  }

  return (
    <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
      <div className="gap-2.5 self-start p-2.5 ml-12 text-9xl text-white max-md:max-w-full max-md:text-6xl max-md:ml-[22px] max-sm:text-4xl">
        OUR BROTHERS
      </div>
      <div className="flex flex-col items-start px-14 pt-12 pb-40 mt-32 w-full bg-white max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
        <nav
          className="flex gap-7 items-center pl-3 text-xl max-md:text-base text-black"
          role="navigation"
        >
          {validTabs.map((tab) => (
            <a
              key={tab}
              href={`/brothers?tab=${tab}`}
              className={`focus:outline-none leading-none hover:text-brandRed transition-colors duration-200 ${
                activeTab === tab ? "text-brandRed font-semibold" : "text-black"
              }`}
            >
              {tab}
              {activeTab === tab ? (
                <Underline />
              ) : (
                <div className="h-[3px] w-full mt-[2px]" />
              )}
            </a>
          ))}
        </nav>

        {/* ✅ Suspense around a Server Component */}
        <Suspense fallback={<div>Loading...</div>}>
          <BrotherSectionWrapper activeTab={activeTab} />
        </Suspense>
      </div>
    </div>
  );
}
