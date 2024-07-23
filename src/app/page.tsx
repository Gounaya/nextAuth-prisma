import { getServerSession } from "next-auth";
import { LoginButton } from "../auth/LoginButton";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { User } from "@/auth/User";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {

  const session = await getAuthSession();

  if (session) {
    return <User />;
  }

  return (
    <div>
      <LoginButton />
    </div>
  );
}
