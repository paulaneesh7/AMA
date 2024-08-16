import Image from "next/image";
import { auth } from "../auth";

export default async function UserAvatar() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <div>
      <Image
        src={user.image ?? ""}
        alt={user.name ?? "User avatar"}
        width={40}
        height={40}
        className="rounded-full border-2 border-white"
      />
    </div>
  );
}
