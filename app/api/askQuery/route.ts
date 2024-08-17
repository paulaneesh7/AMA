import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authorized! Please Sign In" }, { status: 401 });
  }

  const { query } = await request.json();

  if (typeof query != "string" || query === "") {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  console.log(typeof session.user.id); // To see the type at runtime

  try {
    const newQuery = await prisma.query.create({
      data: {
        query,
        userId: String(session.user.id),
      },
    });

    return NextResponse.json({ query: newQuery }, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
