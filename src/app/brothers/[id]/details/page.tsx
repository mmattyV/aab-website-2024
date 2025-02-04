import { fetchBrotherById } from "@/app/lib/data";
import { BrotherProfile } from "@/app/ui/brothers/BrotherProfile";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const brotherProfileData = await fetchBrotherById(id);

    if (!brotherProfileData) {
        return <div>Brother profile not found</div>;
    }

    return <BrotherProfile {...brotherProfileData} />; // ✅ Directly pass object props
}