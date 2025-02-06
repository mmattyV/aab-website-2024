import { fetchRecruitById } from "@/app/lib/data";
import { RecruitProfile } from "@/app/ui/recruits/RecruitProfile";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const recruitProfileData = await fetchRecruitById(id);

    if (!recruitProfileData) {
        return <div>Recruit profile not found</div>;
    }

    return <RecruitProfile {...recruitProfileData} />; // ✅ Directly pass object props
}