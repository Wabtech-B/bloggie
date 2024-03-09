import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await auth();

    if (!session) {
      return new Response("You are not authenticated!", { status: 401 });
    }

    await prisma.user.delete({
      where: { id: session.user?.id },
    });

    return new NextResponse("Account deleted succesfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new NextResponse("Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
