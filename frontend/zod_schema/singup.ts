import * as z from "zod";

const signupFormSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z
    .email()
    .min(5, "Email must be at least 20 characters.")
    .max(100, "Email must be at most 100 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters."),
}).refine((data) => data.confirmPassword === data.password, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

export default signupFormSchema;