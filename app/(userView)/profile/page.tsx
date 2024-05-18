"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useForm } from "react-hook-form";
import { GetUserProfile, OnDelete } from "./_actions/getUserProfile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUser } from "./_actions/updateUser";
import { useRouter } from "next/navigation";

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

export default function ProfilePage() {
  const userNameString =
    typeof window !== "undefined" ? localStorage.getItem("userName") : null;
  const userName = userNameString !== null ? userNameString : "";
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await GetUserProfile(userName);
      const user1 = userResponse.data;
      setUserData(user1);
    };

    fetchUserData();
  }, []);

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

  const onEdit = async (values: z.infer<typeof formSchema>) => {
    try {
      await UpdateUser(values, userData.id);
      localStorage.setItem("userName", values.username);
      alert("Data Successfully changed");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  async function onDelete() {
    const confirmation = window.confirm(
      "Are you sure you wish to delete your Account?"
    );
    try {
      await OnDelete(userData.id, confirmation);
      localStorage.removeItem("userName");
      localStorage.clear();
      router.push("/sign-in");
    } catch (error) {
      console.log("delete wrong", error);
    }

    /*const confirmation = window.confirm("Are you sure you wish to delete your Account?");
    if(confirmation){
    try{
     await db.user.delete({
      where: {
        id: userData.id,
      }
    })
    localStorage.delete("userName");
    router.push("/sign-in")
  }catch (error){
    console.log("delete wrong", error)
  }
}
else{
  console.log("Cancelled by user");
}*/
  }

  return (
    <div className="profileTitle">
      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily: "Garamond",
          paddingBottom: "20px",
        }}
      >
        Welcome <strong>{userData?.fullName}</strong> to your Profile Page!
      </h1>
      <p>Enter in new details for your preferred fields and click edit.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onEdit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username: </FormLabel>
                <FormControl>
                  <Input placeholder={userData?.username} {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name: </FormLabel>
                <FormControl>
                  <Input placeholder={userData?.fullName} {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.fullName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email: </FormLabel>
                <FormControl>
                  <Input placeholder={userData?.email} {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number: </FormLabel>
                <FormControl>
                  <Input placeholder={userData?.phoneNumber} {...field} />
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
                <FormLabel>Password: </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Write your new Password Here"
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
            Edit Profile
          </Button>
        </form>
      </Form>
      <p style={{ paddingTop: "50px", fontSize: "20px" }}>
        <strong>
          If you wish to delete your account you can do it by pressing the
          button below.
        </strong>
      </p>
      <p style={{ padding: "10px" }}>
        You will not be able to recover your account.
      </p>
      <Button style={{ marginTop: "20px" }} type="submit" onClick={onDelete}>
        Delete Account
      </Button>
    </div>
  );
}
