"use client";

import { updateUser } from "@/actions/users";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreview } from "@/hooks/usePreview";
import { UserUpdateSchemaType } from "@/types";
import { userUpdateSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface EditUserFormProps {
  user: User;
}

const EditUserForm = ({ user }: EditUserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isPreview = usePreview();

  const form = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
      role: user.role,
    },
  });

  /**
   * Handles the form submission for adding a new user.
   * @param {UserUpdateSchemaType} values - The form values containing the user's information.
   */
  const onSubmit = async (values: UserUpdateSchemaType) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await updateUser(user.id, values);
        toast.success("User added!");
        router.push("/admin/users");
      } catch (error: any) {
        setError(error.message);
      }
    });
  };

  return (
    <div className="p-4 rounded-lg border border-border shadow">
      {error && (
        <div className="my-2">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
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

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-transparent mt-2">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="AUTHOR">Author</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
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

export default EditUserForm;
