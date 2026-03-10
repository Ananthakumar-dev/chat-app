"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupFormSchema, { SignupFormSchemaType } from "@/zod_schema/singup";

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
	mode: "onChange",
	defaultValues: {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	}
  });
  
  const onSubmit: SubmitHandler<SignupFormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input id={field.name} type="text" placeholder="John Doe" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input id={field.name} type="email" placeholder="m@example.com" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input id={field.name} type="password" />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <Input id={field.name} type="password" />
              <FieldDescription>Please confirm your password.</FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldGroup>
          <Field>
            <Button type="submit">Create Account</Button>
            <FieldDescription className="px-6 text-center">
              Already have an account?
              <Link href="/login" className="pl-1">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
