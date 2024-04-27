import { z } from "zod";

export const updateUserInput = z
  .object({
    username: z.string(),
    name: z.string(),
    bio: z.string(),
    profilePic: z.string(),
  })
  .partial();
