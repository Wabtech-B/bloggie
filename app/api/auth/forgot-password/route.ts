import { prisma } from "@/lib/prismadb";
import { sendPasswordResetLink } from "@/lib/sendPasswordResetEmail";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("That email doesn't exist in our system", {
        status: 404,
      });
    }
    const resetToken = uuidv4();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    await sendPasswordResetLink(user.email as string, resetToken);

    return new NextResponse(
      "We have sent a password reset link to your email, follow it to reset your password"
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Unable to send an email", { status: 500 });
  }
}
