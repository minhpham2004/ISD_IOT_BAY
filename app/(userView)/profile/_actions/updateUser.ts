"use server";
import { db } from "@/lib/db";
import z from "zod";

const formSchema1 = z.object({
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

export async function UpdateUser(data: any, id: string) {
  const validationResult = formSchema1.safeParse(data);

  if (!validationResult.success) {
    return {
      message: "Validation unsuccessfull",
    };
  }

  const resultData = validationResult.data;
  await db.user.update({
    where: { id: id },
    data: {
      email: resultData.email,
      username: resultData.username,
      password: resultData.password,
      fullName: resultData.fullName,
      phoneNumber: resultData.phone,
    },
  });
}
