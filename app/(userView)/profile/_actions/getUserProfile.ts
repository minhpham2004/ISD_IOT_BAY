"use server";

import { db } from "@/lib/db";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Write your username.",
  }),
});

export async function OnDelete(id: string, confirmation: boolean) {
  if (confirmation) {
    try {
      await db.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log("delete wrong", error);
    }
  } else {
    console.log("Cancelled by user");
  }
}

export async function GetUserProfile(username: string) {
  const validationResult = formSchema.safeParse({ username: username });

  if (!validationResult.success) {
    return {
      message: "Not working brah",
    };
  }

  const resultData = validationResult.data;
  const response = await db.user.findUnique({
    where: {
      username: resultData.username,
    },
  });

  if (response != undefined || response != null) {
    return {
      data: response,
      message: "she working",
    };
  } else {
    return { message: "oh no not working" };
  }
}
