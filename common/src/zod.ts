import { infer, z } from "zod";

export const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

// get type inference
export type SignupInput = z.infer<typeof signupInput>;
