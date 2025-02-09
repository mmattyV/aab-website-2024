import { auth } from "@/auth";
import { fetchBrotherById } from "@/app/lib/data"; // <= We'll create or assume this
import EditProfileForm from "@/app/ui/components/EditProfileForm"; // <= Our new client form

export default async function Page() {
  // 1) Ensure user is logged in
  const session = await auth();
  if (!session || !session.user?.id) {
    console.warn("⚠️ No user session found.");
    return <div>Please log in to edit your profile.</div>;
  }

  // 2) Fetch existing brother data from DB using the user ID
  const brotherId = session.user.id;
  const brother = await fetchBrotherById(brotherId);

  if (!brother) {
    return <div>No brother record found for your account.</div>;
  }

  // 3) Render a layout with the form
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
        <div className="gap-2.5 self-start p-2.5 ml-12 text-9xl text-white max-md:max-w-full max-md:text-6xl max-md:ml-[22px] max-sm:text-4xl">
          EDIT PROFILE
        </div>
      </div>

      {/* Edit Form */}
      <div className="relative w-full flex flex-col items-center mt-[-5rem]">
        <div className="px-4 max-w-lg mx-auto w-full">
          <EditProfileForm brother={brother} id={brotherId} />
        </div>
      </div>
    </div>
  );
}