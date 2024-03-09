"use server";

import { signOut } from "@/auth";

export const logout = async (redirectPath: string = "/") => {
  await signOut({ redirectTo: redirectPath });
};
