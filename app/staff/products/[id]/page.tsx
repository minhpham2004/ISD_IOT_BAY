import { db } from "@/lib/db";
import { notFound } from "next/navigation";

import EditProductForm from "../_components/EditProductForm";

export async function getProduct(id: string) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  return product;
}

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <EditProductForm product={product} productId={id} />
    </div>
  );
}
