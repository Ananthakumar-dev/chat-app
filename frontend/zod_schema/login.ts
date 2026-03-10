import * as z from "zod";

const loginFormSchema = z.object({
    email: z
        .email()
        .min(5, "Email must be at least 20 characters.")
        .max(100, "Email must be at most 100 characters."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(100, "Password must be at most 100 characters.")
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export default loginFormSchema;