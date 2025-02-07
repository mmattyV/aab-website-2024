import { fetchAllComments, fetchAllRecruits } from "@/app/lib/data";
import { RecruitYearSection } from "@/app/ui/recruits/RecruitYearSection";

export default async function RecruitSectionWrapper({
  activeTab,
}: {
  activeTab: string;
}) {
  const allRecruits = await fetchAllRecruits();
  const allComments = await fetchAllComments();
  console.log(allComments);

  console.log(activeTab);

  const years = Array.from(new Set(allRecruits.map((recruit) => recruit.year)));

  return (
    <div className="flex flex-col mt-9 max-w-full w-[1290px]">
      {years.map((year) => (
        <RecruitYearSection
          key={year}
          year={year.toString()}
          recruits={allRecruits.filter((recruit) => recruit.year === year)}
        />
      ))}
    </div>
  );
}
