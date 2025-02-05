import { auth } from "@/auth"; // Correctly import auth from auth.ts
import MenuButton from "./MenuButton";

interface MenuWrapperProps {
  text: string;
  icon: string;
}

export default async function MenuWrapper({ text, icon }: MenuWrapperProps) {
  const session = await auth(); // ✅ Await the session
  const isLoggedIn = !!session?.user; // ✅ Now session.user is accessible

  return <MenuButton text={text} icon={icon} isLoggedIn={isLoggedIn} />;
}