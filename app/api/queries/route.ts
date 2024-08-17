import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Not authorized! Please Sign In" },
      { status: 401 }
    );
  }

  try {
    const queries = await prisma.query.findMany({
      select: {
        id: true,
        query: true,
        userId: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    console.log(queries);

    return NextResponse.json({ queries }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
