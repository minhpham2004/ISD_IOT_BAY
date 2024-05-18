"use server";
import { db } from "@/lib/db";
import z from "zod";

const formSchema = z.object({
  cardNumber: z.number().gte(8, {
    message: "Please fill in a valid card number with at least 8 digits",
  }),
  cardPassword: z.number().gt(3, {
    message: "Card CVV must be exactly 3 characters",
  }),
  cardName: z.string().min(0, {
    message: "Please fill in the card name",
  }),
  paymentAmount: z.number(),
});

export const proceedPayment = async (data: any, orderId: string) => {
  const validationResult = formSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const resultData = validationResult.data;
  await db.payment.create({
    data: {
      paymentCardNumber: resultData.cardNumber,
      paymentPassword: resultData.cardPassword,
      paymentCardName: resultData.cardName,
      paymentAmount: resultData.paymentAmount,
      orderId: orderId,
    },
  });
};
