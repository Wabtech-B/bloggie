"use client";

import { updateCategory } from "@/actions/categories";
import Modal from "@/components/modal";
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
import { Textarea } from "@/components/ui/textarea";
import { usePreview } from "@/hooks/usePreview";
import { PostCategorySchemaType } from "@/types";
import { postCategorySchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface EditCategoryProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category;
}

const EditCategory = ({
  editModal,
  setEditModal,
  category,
}: EditCategoryProps) => {
  const [isPending, startTransition] = useTransition();
  const isPreview = usePreview();

  const form = useForm<PostCategorySchemaType>({
    resolver: zodResolver(postCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description || "",
    },
  });

  /**
   * Resets the form and closes the edit modal.
   */
  const onReset = () => {
    setEditModal(false);
    form.reset();
  };

  /**
   * Handles the form submission by updating the category with the provided data.
   */
  const onSubmit = (values: PostCategorySchemaType) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await updateCategory(category.id, values);
        toast.success("Category updated!");
        onReset();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <>
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">Edit Post Category</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-3">
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

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-align-center gap-3 my-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onReset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <div className="flex-align-center gap-x-2">
                      <ImSpinner2 className="animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditCategory;
