import React from "react";
import SignInForm from "../_components/sign-in-form";
import Link from "next/link";
import { getUsers } from "@/actions/home/users";

const SignIn = async () => {
  const users = await getUsers();
  const adminUserExists = users.some((user) => user.role === "ADMIN");

  return (
    <div>
      {!adminUserExists && (
        <div className="mt-4 text-center p-2 bg-brand/20 rounded-lg">
          <Link href="/admin/sign-up" className="text-brand hover:underline">
            First Create Admin Account!
          </Link>
        </div>
      )}
      <SignInForm />
      <p className="mt-2 text-center">
        Email: <strong>admin@gmail.com</strong>, Password:{" "}
        <strong>12345678</strong>
      </p>
    </div>
  );
};

export default SignIn;
