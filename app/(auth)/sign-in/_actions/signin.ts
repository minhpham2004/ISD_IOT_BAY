"use server";
import { db } from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(0, {
    message: "Please fill in your password.",
  }),
});

export async function signIn(data: any) {
  const validationResult = formSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const resultData = validationResult.data;
  const accountByUsername = await db.user.findUnique({
    where: {
      username: resultData.username,
    },
  });

  if (accountByUsername) {
    if (accountByUsername.password !== resultData.password) {
      return {
        message: "error",
        error: "Wrong Password",
      };
    } else {
      return {
        message: "success",
        data: {
          accountByUsername,
        },
      };
    }
  } else {
    return {
      message: "error",
      error: "Cannot not find account with this username",
    };
  }
}
