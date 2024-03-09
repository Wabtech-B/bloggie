"use client";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserLoginSchemaType } from "@/types";
import { userLoginSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();

  const form = useForm<UserLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
  });

  /**
   * Retrieves the values of "callbackUrl" and "message" from the current url.
   */
  const callbackUrl = searchParams.get("callbackUrl");
  const message = searchParams.get("message");

  const onSubmit = async (values: UserLoginSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl, "/admin")
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl">Login to continue</h1>
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}

      {(message || success) && (
        <div className="my-2">
          <span className="text-green-500">{message || success}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-2">
            <Link
              href="/admin/forgot-password"
              className="text-brand underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-5">
            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex-center-center gap-x-2">
                  <ImSpinner2 className="text-lg animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
