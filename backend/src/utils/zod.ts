import { z } from "zod";

export const updateUserInput = z
  .object({
    username: z.string(),
    name: z.string(),
    bio: z.string(),
    profilePic: z.string(),
  })
  .partial();

export const saveBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const blogUpdateInput = z.object({
  title: z.string(),
  content: z.string(),
});

// get type inference
export type SignupInput = z.infer<typeof signupInput>;
export type BlogUpdateInput = z.infer<typeof blogUpdateInput>;
