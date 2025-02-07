import { fetchRecruitById } from "@/app/lib/data";
import { RecruitProfile } from "@/app/ui/recruits/RecruitProfile";

type PageProps = {
  params: Promise<{ id: string }>; // ✅ Explicitly treat params as a Promise
};

export default async function Page(props: PageProps) {
  const params = await props.params; // ✅ Await params
  const id = params.id;

  const recruitProfileData = await fetchRecruitById(id);

  if (!recruitProfileData) {
    return <div>Recruit profile not found</div>;
  }

  return <RecruitProfile {...recruitProfileData} id={id} />; // ✅ Pass id explicitly
}