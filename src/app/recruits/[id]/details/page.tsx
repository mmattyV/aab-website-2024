import { fetchAllComments, fetchRecruitById } from "@/app/lib/data";
import { RecruitProfile } from "@/app/ui/recruits/RecruitProfile";

type PageProps = {
  params: Promise<{ id: string }>; // ✅ Explicitly treat params as a Promise
};

export default async function Page(props: PageProps) {
  const params = await props.params; // ✅ Await params
  const id = params.id;

  const recruitProfileData = await fetchRecruitById(id);
  const allComments = await fetchAllComments();

  const filteredComments = allComments.filter(
    (comment) => comment.recruit_id === id
  );

  if (!recruitProfileData) {
    return <div>Recruit profile not found</div>;
  }

  return <RecruitProfile {...recruitProfileData} id={id} comments={filteredComments} />; // ✅ Pass id explicitly
}