"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchemaType } from "@/types";
import { resetPasswordSchema } from "@/validation/schemas";
import axios from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") as string;
  const token = searchParams.get("token");

  /**
   * useEffect hook that redirects the user to the sign-in page if the email or token is missing.
   */
  useEffect(() => {
    if (!email || !token) {
      router.push("/admin/sign-in");
    }
  }, [email, router, token]);

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: ResetPasswordSchemaType) {
    setError(null);
    try {
      await axios.put("/api/auth/reset-password", {
        newPassword: values.newPassword,
        email,
        token,
      });
      router.push(
        "/admin/sign-in?message=Your password has been reset successfully, Login"
      );
    } catch (error: any) {
      setError(error.response.data);
    }
  }

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold mt-6">Reset Password</h1>
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input type="email" value={email} disabled readOnly />
          </div>

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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
                      placeholder="New Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Password Confirmation"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5">
            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex-center-center gap-x-2">
                  <ImSpinner2 className="text-lg animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
