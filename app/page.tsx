import { auth } from "@/auth";
import Main from "@/components/Main";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Main />

      {session?.user?.name?.split(" ")[0] === "Aneesh" && (
        <div className="flex justify-center items-center mt-8 w-full">
          <Link href="/queries" className="hover:underline">
            Queries 
          </Link>
        </div>
      )}
    </>
  );
}
