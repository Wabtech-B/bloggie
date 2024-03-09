import { prisma } from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { email, token, newPassword } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json("Password reset successfully");
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
