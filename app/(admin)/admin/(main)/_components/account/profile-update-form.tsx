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
import { ProfileUpdateSchemaType } from "@/types";
import { profileUpdateSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const ProfileUpdateForm = () => {
  const { update, data } = useSession();
  const isPreview = usePreview();

  const form = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: data?.user.name!,
      email: data?.user.email!,
    },
  });

  /**
   * Handles the submission of user data for updating the profile.
   */
  const onSubmit = async (values: ProfileUpdateSchemaType) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    await update({ name: values.name, email: values.email });
    toast.success("Profile Updated successfully");
  };

  return (
    <div className="p-2 sm:p-4 rounded-lg border border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-align-center flex-col sm:flex-row gap-4">
            {/* Name */}
            <div className="flex-1 w-full sm:w-fit">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className="flex-1 w-full sm:w-fit">
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

export default ProfileUpdateForm;
