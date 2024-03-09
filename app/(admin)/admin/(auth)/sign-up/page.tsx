import { getUsers } from "@/actions/home/users";
import { notFound } from "next/navigation";
import SignUpForm from "../_components/sign-up-form";

const SignUp = async () => {
  const users = await getUsers();
  const adminUserExists = users.some((user) => user.role === "ADMIN");
  // If an admin user exists, return notFound;
  if (adminUserExists) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Bloggie</h1>
      <p className="mt-3">
        Note: Once the account is created, you cannot access this page again
        unless you delete your account
      </p>
      <div className="mt-3">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
