import { fetchBrotherById } from "@/app/lib/data";
import { BrotherProfile } from "@/app/ui/brothers/BrotherProfile";
import { auth } from "@/auth";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const brotherProfileData = await fetchBrotherById(id);

  const session = await auth(); // e.g. { user: { id: '123', email: 'me@example.com' }, ... } or null
  const isLoggedIn = !!session; // Convert to boolean

  if (!brotherProfileData) {
    return <div>Brother profile not found</div>;
  }

  return <BrotherProfile {...brotherProfileData} isLoggedIn={isLoggedIn} />; // ✅ Directly pass object props
}
