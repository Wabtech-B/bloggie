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
import { ForgotPasswordSchemaType } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { forgotPasswordSchema } from "@/validation/schemas";
import axios from "axios";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordSchemaType) {
    try {
      const response = await axios.post("/api/auth/forgot-password", {
        email: values.email,
      });
      setSuccessMessage(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response.data);
    }
  }

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold mt-6">Forgot Password?</h1>
      <p className="mt-2 text-lg">
        Enter your registered email address and we shall send you a link to
        reset your password.
      </p>
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      {successMessage && (
        <div className="my-2 p-4 bg-green-500/20 rounded-lg">
          <span className="text-green-500">{successMessage}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <div className="mt-5">
            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={form.formState.isSubmitting || successMessage !== null}
            >
              {form.formState.isSubmitting ? (
                <div className="flex-center-center gap-x-2">
                  <ImSpinner2 className="text-lg animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Send Link"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <Link
        href="/admin/sign-in"
        className="mt-4 text-brand block flex-center-center gap-x-2"
      >
        <ArrowLeft />
        <span>Go Back</span>
      </Link>
    </div>
  );
};

export default ForgotPassword;
