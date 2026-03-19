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
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import loginFormSchema, { LoginFormSchemaType } from "@/zod_schema/login";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";

const LoginForm = () => {
    const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;

    const result = await dispatch(login({
        email: data.email,
        password: data.password
    }))

    if(login.fulfilled.match(result)) {
        router.push('/chat');
        toast.success("Logged in successfully! You can now chat with your assistant.");
    } else {
        toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} id={field.name} type="email" placeholder="m@example.com" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input {...field} id={field.name} type="password" required />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Login</Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?
            <Link href="/signup" className="pl-1">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
