import { z } from "zod";

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
export type blogUpdateInput = z.infer<typeof blogUpdateInput>;
