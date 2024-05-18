import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ItemDetail from "./_components/productDes";

async function getProduct(id: string) {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });
    return product;
}

export default async function item({params: { id },
    params,
  }: {
    params: { id: string };
  }) {
    const product = await getProduct(id);
    if (!product) {
        return notFound();
    }
    return (
        <div>
            <ItemDetail key={product.id} {...product} />
        </div>
    )
}
