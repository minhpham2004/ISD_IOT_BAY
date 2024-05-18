"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function editProduct(data: any, productId: string) {
  const productSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    description: z.string(),
    imageUrl: z.string(),
    stock: z.coerce.number(),
    type: z.string(),
  });

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const product = await db.product.update({
      where: {
        id: productId,
      },
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
  redirect(`/staff`);
}

export async function updateProductStock(
  productId: string,
  stockRemaining: number
) {
  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      stock: stockRemaining,
    },
  });
}

export async function deleteProduct(productId: string) {
  try {
    const res = await db.product.delete({
      where: {
        id: productId,
      },
    });

    redirect(`/staff`);
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
}
