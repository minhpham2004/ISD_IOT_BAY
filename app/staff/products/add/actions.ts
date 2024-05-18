"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function uploadProduct(formData: FormData) {
  const productSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    description: z.string(),
    imageUrl: z.string(),
    stock: z.coerce.number(),
    type: z.string(),
  });

  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    stock: formData.get("stock"),
    type: formData.get("type"),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    await db.product.create({
      data: {
        name: result.data.name,
        price: result.data.price,
        description: result.data.description,
        imageUrl: result.data.imageUrl,
        stock: result.data.stock,
        type: result.data.type,
      },
    });
  }
  redirect(`/staff/`);
}
