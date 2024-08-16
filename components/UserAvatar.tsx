import Image from "next/image";
import { auth } from "../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserAvatar() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <div>
      <Image
        src={user?.image ?? ""}
        alt={user?.name ?? "User Avatar"}
        width={40}
        height={40}
        className="rounded-full border-2 border-white"
      />
    </div>
  );
}
