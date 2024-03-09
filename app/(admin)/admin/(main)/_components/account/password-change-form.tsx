"use client";

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
import { usePreview } from "@/hooks/usePreview";
import { ChangePasswordSchemaType } from "@/types";
import { changePasswordSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const PasswordChangeForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isPreview = usePreview();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(values: ChangePasswordSchemaType) {
    setError(null);
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await axios.put("/api/auth/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed, logging out");
      setError(null);
      form.reset();
      await signOut();
    } catch (error: any) {
      setError(error.response.data);
    }
  }

  return (
    <div className="mt-8 p-2 sm:p-4 rounded-lg border border-border">
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeIcon className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      {...field}
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="New Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex-align-center flex-col sm:flex-row gap-4">
            {/* New Password */}
            <div className="flex-1 w-full sm:w-fit">
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
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeIcon className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Password Confirmation"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex-1 w-full sm:w-fit">
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
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="secondary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex-center-center gap-x-2">
                  <ImSpinner2 className="text-lg animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;
