import { Collection, Post } from "@prisma/client";
import * as z from "zod";
import {
  changePasswordSchema,
  collectionSchema,
  commentSchema,
  forgotPasswordSchema,
  postCategorySchema,
  postSchema,
  profileUpdateSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegistrationSchema,
  userSchema,
  userUpdateSchema,
} from "@/validation/schemas";

// --------------------------- FORMS TYPES--------------------------------------------------------------------------------------
export type UserSchemaType = z.infer<typeof userSchema>;
export type UserRegistrationSchemaType = z.infer<typeof userRegistrationSchema>;
export type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>;
export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export type ProfileUpdateSchemaType = z.infer<typeof profileUpdateSchema>;
export type PostSchemaType = z.infer<typeof postSchema>;
export type PostCategorySchemaType = z.infer<typeof postCategorySchema>;
export type CollectionSchemaType = z.infer<typeof collectionSchema>;
export type CommentSchemaType = z.infer<typeof commentSchema>;

// ---------------------------POSTS, CATEGORY, COLLECTION--------------------------------------------------------------------------------------
export type TTPost = Post & {
  category: { name: string };
  author: Author;
};

export type Author = {
  name: string | null;
  image: string | null;
};

export type TPost = Post & { category: TCategory };

export type TCategory = {
  name: string;
};

export type TCollection = Collection & { posts: Post[] };

export type CollectionsPosts = {
  collections: TCollection[];
  posts: TPost[];
};
