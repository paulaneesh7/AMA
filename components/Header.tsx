import { auth } from "@/auth";
import SignIn from "@/components/Signin";
import SignOut from "@/components/Signout";
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <div className="flex mt-5 justify-between mx-5 items-center">
        <div className="flex gap-3 items-center">
          {!user && <h1 className="font-bold">AMA</h1>}
          <h1 className="font-bold">{user?.name?.split(" ")[0]}</h1>
        </div>

        <div className="flex gap-3 items-center">
        <ModeToggle />
          {user ? (
            <div>
              <SignOut />
            </div>
          ) : (
            <SignIn />
          )}

          {user && <UserAvatar />}
        </div>
      </div>
    </div>
  );
};

export default Header;
