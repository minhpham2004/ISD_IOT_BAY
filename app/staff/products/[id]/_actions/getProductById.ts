"use server";

import { db } from "@/lib/db";

export async function getProductById(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
}
