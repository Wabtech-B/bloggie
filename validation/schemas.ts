import * as z from "zod";

// User Registration Schema ---------------------------------------------------------------------------------------------------------------
export const userRegistrationSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(3),
    email: z
      .string({ required_error: "Email address is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User  Schema ---------------------------------------------------------------------------------------------------------------
export const userSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(3),
    email: z
      .string({ required_error: "Email address is required" })
      .email("Invalid email address"),
    role: z.string().optional(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User Update Schema ---------------------------------------------------------------------------------------------------------------
export const userUpdateSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  role: z.string().optional(),
});

// User Login Schema ---------------------------------------------------------------------------------------------------------------
export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  password: z.string({ required_error: "Password is required" }),
});

// Forgot Password Schema ---------------------------------------------------------------------------------------------------------------
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email adddress"),
});

// Reset Password Schema ---------------------------------------------------------------------------------------------------------------
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: "New Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Change Password Schema ---------------------------------------------------------------------------------------------------------------
export const changePasswordSchema = z
  .object({
    currentPassword: z.string({
      required_error: "Current Password is required",
    }),
    newPassword: z
      .string({ required_error: "New Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Profile Update Schema ---------------------------------------------------------------------------------------------------------------
export const profileUpdateSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
});

// Post Schema ---------------------------------------------------------------------------------------------------------------
export const postSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  categoryId: z.string({ required_error: "Category is required" }),
  description: z.string({ required_error: "Description is required" }),
  content: z.string({ required_error: "Content is required" }),
  tags: z.array(z.string()).min(1, "Add atleast one tag"),
  isPublished: z.boolean(),
});

// Post Category Schema ---------------------------------------------------------------------------------------------------------------
export const postCategorySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  description: z.string().optional(),
});

// Post Collection Schema ---------------------------------------------------------------------------------------------------------------
export const collectionSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  description: z.string().optional(),
});

// Post Comments Schema ---------------------------------------------------------------------------------------------------------------
export const commentSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  content: z.string({ required_error: "Comment is required" }),
});
