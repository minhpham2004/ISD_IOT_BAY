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
import { signIn } from "./_actions/signin";

import { toast } from "sonner";
import { findUserIdByName } from "./_actions/findUserIdByName";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(0, {
    message: "Please fill in your password.",
  }),
});

function SignIn() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn(values);
      if (res.message === "error") {
        toast.error(res.error);
      } else {
        toast.success("Sign in successfully");
        localStorage.setItem("firstLogin", true.toString());

        localStorage.setItem("userName", values.username);

        const userId = await findUserIdByName(values.username);
        if (userId) {
          localStorage.setItem("userId", userId);
        }

        router.push("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-1/2 justify-center align-center transform translate-x-1/2 translate-y-1/2">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold">Sign in</h2>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Fill in your username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.username?.message}
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </>
              )}
            />
            <Button style={{ marginTop: "20px" }} type="submit">
              Sign in
            </Button>
            {/* <Link href={"/Home"}>
              <Button
                style={{ marginLeft: "12px" }}
                className="bg-blue-500 text-white"
                type="submit"
              >
                Guest
              </Button>
            </Link> */}
          </form>
        </Form>
        <p className="my-4">
          You don&apos;t have an account?{" "}
          <Link href={"/sign-up"}>
            <span className="text-sm text-gray-600 cursor-pointer hover:underline">
              Register Now
            </span>
          </Link>
        </p>
        <p className="my-4">
          Are you a staff?{" "}
          <Link href={"/staff"}>
            <span className="text-sm text-gray-600 cursor-pointer hover:underline">
              To Staff Dashboard
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
