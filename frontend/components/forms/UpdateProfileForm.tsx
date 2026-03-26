"use client";

import updateProfileFormSchema from "@/zod_schema/update_profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile } from "@/store/slices/authSlice";

const UpdateProfileForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const form = useForm({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: undefined,
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof updateProfileFormSchema>,
  ) => {
    try {
      const result = await dispatch(updateProfile(data));
      toast.success("Profile updated successfully!");

      // close the modal
      onClose?.();
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter Name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Email"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="space-y-2">
        <Controller
          name="avatar"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Avatar</FieldLabel>
              <Input
                type="file"
                id={field.name}
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(e.target.files)}
                onBlur={field.onBlur}
                disabled={field.disabled}
                name={field.name}
                ref={field.ref}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {user?.avatar && (
          <div className="flex flex-col items-start gap-2">
            <FieldLabel>Current Avatar</FieldLabel>
            <img
              src={user.avatar}
              alt="Current Avatar"
              className="h-20 w-20 rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div className="text-right">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
