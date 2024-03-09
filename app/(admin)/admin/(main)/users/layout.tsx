import { auth } from "@/auth";
import { notFound } from "next/navigation";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") notFound();

  return <>{children}</>;
};

export default UserLayout;
