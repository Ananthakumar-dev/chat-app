import * as z from "zod";

const updateProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z
    .email()
    .min(5, "Email must be at least 20 characters.")
    .max(100, "Email must be at most 100 characters."),
  avatar: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Please upload exactly one file.")
    .refine((files) => {
      const file = files[0];
      return file.type.startsWith("image/");
    }, "Only image files are allowed."),
});

export type UpdateProfileFormSchemaType = z.infer<
  typeof updateProfileFormSchema
>;

export default updateProfileFormSchema;
