import { auth } from "@/auth";
import SignIn from "@/components/Signin";
import SignOut from "@/components/Signout";
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex mt-5 justify-between mx-5 items-center">
      <div className="flex gap-3 items-center">
        {!user && <h1 className="font-bold">Next Auth Setup</h1>}
        <h1 className="font-bold">{user?.name}</h1>
        {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
      </div>

      <div className="flex gap-3 items-center">
        {user ? (
          <div>
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}

        {/* {user && <UserAvatar />} */}
      </div>
    </div>
  );
}
