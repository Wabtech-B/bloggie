"use client";

import { addCategory } from "@/actions/categories";
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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const AddCategory = () => {
  const [isPending, startTransition] = useTransition();
  const [addModal, setAddModal] = useState(false);
  const isPreview = usePreview();

  const form = useForm<PostCategorySchemaType>({
    resolver: zodResolver(postCategorySchema),
  });

  /**
   * Resets the form and closes the edit modal.
   */
  const onReset = () => {
    setAddModal(false);
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
        await addCategory(values);
        toast.success("Category added!");
        onReset();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setAddModal(true);
        }}
      >
        + Add Category
      </Button>
      <Modal isOpen={addModal} onClose={() => setAddModal(false)}>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">Add Post Category</h3>
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

export default AddCategory;
