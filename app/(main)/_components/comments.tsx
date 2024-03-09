"use client";

import { addComment } from "@/actions/home/comments";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentSchemaType } from "@/types";
import { commentSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const Comments = ({
  postId,
  comments,
}: {
  postId: string;
  comments: { name: string; content: string }[];
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (values: CommentSchemaType) => {
    startTransition(async () => {
      try {
        await addComment(postId, values);
        toast.success("Your comment will show once approved");
        form.reset({
          name: "",
          email: "",
          content: "",
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-2">Comments</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 max-w-md p-2 border rounded-lg">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
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
                  <FormControl>
                    <Input {...field} placeholder="Email Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comment */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Comment"
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <div className="flex-align-center gap-x-2">
                  <ImSpinner2 className="animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </Form>

      {comments.length > 0 && (
        <div className="mt-5">
          <h1 className="text-2xl mb-3">
            Previous Comments({comments.length})
          </h1>
          <div className="p-3 rounded-lg border max-w-lg">
            {comments.map((comment) => (
              <div
                key={comment.content}
                className="py-2 border-b last:border-b-0"
              >
                <h1 className="text-lg mb-1 text-gray-700 dark:text-slate-100">
                  {comment.name}
                </h1>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
