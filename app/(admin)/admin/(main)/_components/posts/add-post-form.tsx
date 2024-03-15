"use client";

import { addPost } from "@/actions/posts";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePreview } from "@/hooks/usePreview";
import { postToolbarOptions } from "@/lib/quiltoolbar";
import { generateSlug } from "@/lib/utils";
import { PostSchemaType } from "@/types";
import { postSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import "react-quill/dist/quill.snow.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

/**
 * Dynamically imports the ReactQuill component and configures the highlight.js library.
 */
const ReactQuill = dynamic(
  () => {
    hljs.configure({});
    // @ts-ignore
    window.hljs = hljs;
    return import("react-quill");
  },
  {
    ssr: false,
    loading: () => <p>Loading</p>,
  }
);

interface AddPostFormProps {
  categories: Category[];
}

const AddPostForm = ({ categories }: AddPostFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState("");
  const user = useCurrentUser();
  const router = useRouter();
  const isPreview = usePreview();

  const form = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      isPublished: true,
    },
  });

  /**
   * Handles the form submission for adding a new post.
   * @param {PostSchemaType} values - The values object containing the post details.
   */
  const onSubmit = (values: PostSchemaType) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    if (!image) {
      toast.error("Please add a cover image");
      return;
    }
    startTransition(async () => {
      try {
        await addPost(values, {
          authorId: user?.id!,
          coverImage: image,
          slug: generateSlug(values.title),
        });
        toast.success("Post added!");
        router.push("/admin/posts");
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="p-4 border border-border rounded-lg shadow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-5 space-y-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Title"
                        className="border-0 outline-none text-4xl w-full bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <div className="quill post-quill">
                        <ReactQuill
                          theme="snow"
                          id="content"
                          value={field.value}
                          onChange={field.onChange}
                          modules={{
                            toolbar: postToolbarOptions,
                            syntax: true,
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2 md:h-fit md:sticky md:top-20">
              <div className="mb-4 hidden md:block">
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <div className="flex-align-center gap-x-2">
                      <ImSpinner2 className="animate-spin" />
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    "Publish"
                  )}
                </Button>
              </div>

              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-transparent">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.length < 1 ? (
                            <div className="flex-center-center">
                              <p>No categories</p>
                            </div>
                          ) : (
                            <>
                              {categories?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image */}
              <div className="mt-4">
                <label htmlFor="image">Cover Image</label>
                <ImageUpload setImage={setImage} />
              </div>

              {/* Description */}

              <div className="mt-4">
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description: (For SEO)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:hidden">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <div className="flex-align-center gap-x-2">
                  <ImSpinner2 className="animate-spin" />
                  <span>Publishing...</span>
                </div>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPostForm;
