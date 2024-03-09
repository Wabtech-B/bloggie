"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type UserData = {
  email: string;
  password: string;
};

export const login = async (
  data: UserData,
  callbackUrl: string | null,
  redirectPath: string = "/admin"
) => {
  const { email, password } = data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || redirectPath,
    });
    return { success: "Login Successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
