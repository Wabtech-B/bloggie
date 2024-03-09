import { prisma } from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, password, role } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
        role,
      },
    });

    return NextResponse.json("Account created successfully");
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
