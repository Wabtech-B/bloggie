"use client";

import { updateCollection } from "@/actions/collections";
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
import { Collection } from "@prisma/client";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface EditCollectionProps {
  editDrawer: boolean;
  setEditDrawer: Dispatch<SetStateAction<boolean>>;
  collection: Collection;
}

const EditCollection = ({
  collection,
  editDrawer,
  setEditDrawer,
}: EditCollectionProps) => {
  const [isPending, startTransition] = useTransition();
  const isPreview = usePreview();

  const form = useForm<CollectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection.name,
      description: collection.description || "",
    },
  });

  /**
   * Resets the state of the edit drawer.
   */
  const onReset = () => {
    setEditDrawer(false);
  };

  /**
   * Handles the submission of a form data for updating a collection.
   */
  const onSubmit = (data: CollectionSchemaType) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await updateCollection(collection.id, data);
        toast.success("collection updated!");
        onReset();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div>
      <Drawer
        isOpen={editDrawer}
        onClose={() => setEditDrawer(false)}
        position="right"
      >
        <h1 className="text-2xl">Edit Collection</h1>
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

export default EditCollection;
