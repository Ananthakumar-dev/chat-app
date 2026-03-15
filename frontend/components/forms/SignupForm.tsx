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
import { toast } from "sonner";
import signupFormSchema, { SignupFormSchemaType } from "@/zod_schema/singup";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {signup} from "@/store/slices/authSlice";

const SignupForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`;

    const result = await dispatch(signup({
        name: data.name,
        email: data.email,
        password: data.password,
    }));

    if (signup.fulfilled.match(result)) {
      // Redirect to dashboard or home page
      router.push('/chat');

      toast.success("Account created successfully! You can now chat with your assistant.");
    } else {
        toast.error("error happend")
    }
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
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="John Doe"
              />

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
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="m@example.com"
              />

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
              <Input {...field} id={field.name} type="password" />
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
              <Input {...field} id={field.name} type="password" />
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
