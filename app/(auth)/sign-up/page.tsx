"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "./_actions/signup";
import { toast } from "sonner";
import { findUserIdByName } from "../sign-in/_actions/findUserIdByName";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  fullName: z.string().min(2, {
    message: "Please enter your full name.",
  }),
  email: z.string().min(2, {
    message: "Email must not be blank.",
  }),
  phone: z.string().min(0, {
    message: "Please enter a valid phone number.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

function SignUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signUp(values);
      localStorage.setItem("firstLogin", true.toString());
      localStorage.setItem("userName", values.username);

      const userId = await findUserIdByName(values.username);
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      router.push("/Home");
      toast.success("Sign up successfully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-1/2 justify-center align-center transform translate-x-1/2 translate-y-1/4">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold">Sign up</h2>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill in your username" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.username?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill in your email" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill in your full name" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.fullName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill in your phone" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.phone?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fill in your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button style={{ marginTop: "20px" }} type="submit">
              Sign in
            </Button>
          </form>
        </Form>
        <p className="my-4">
          You have already had an account?{" "}
          <Link href={"/sign-in"}>
            <span className="text-sm text-gray-600 cursor-pointer hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
