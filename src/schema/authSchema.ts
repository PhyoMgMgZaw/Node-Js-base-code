import { z } from "zod";
export const devSchema = z.object({
  name: z
    .string({
      error: "Passwrod is requried",
    })
    .min(1, "Name is required"),
  email: z
    .string({
      error: "Email is requried",
    })
    .email("Invalid email"),
  role: z.string().optional(),
  team: z
    .string({
      error: "Team is requried",
    })
    .min(1, "Team is required"),
  password: z
    .string({
      error: "Password is requried",
    })
    .min(6, "Password must be at least 6 characters"),
  
});

export const loginSchema = z.object({
  devId: z.string({
    error: "Dev ID is required",
  }),
  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export type LoginType = z.infer<typeof loginSchema>;
export type Dev = z.infer<typeof devSchema>;
