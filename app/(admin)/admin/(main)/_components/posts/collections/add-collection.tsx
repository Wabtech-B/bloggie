"use client";

import { addCollection } from "@/actions/collections";
import Drawer from "@/components/drawer";
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
import { CollectionSchemaType } from "@/types";
import { collectionSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const AddCollection = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isPreview = usePreview();

  const form = useForm<CollectionSchemaType>({
    resolver: zodResolver(collectionSchema),
  });

  /**
   * Resets the form and closes the drawer.
   */
  const onReset = () => {
    setDrawerOpen(false);
    form.reset({
      name: "",
      description: "",
    });
  };

  /**
   * Handles the adding of a collection.
   */
  const onSubmit = (values: CollectionSchemaType) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await addCollection(values);
        toast.success("Collection added!");
        onReset();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div>
      <Button onClick={() => setDrawerOpen(true)}>+ Add Collection</Button>
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="right"
      >
        <h1 className="text-2xl">Add Collection</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-5 space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Collection Name" />
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
            <div className="flex-align-center gap-3 mt-4 justify-end">
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
      </Drawer>
    </div>
  );
};

export default AddCollection;
