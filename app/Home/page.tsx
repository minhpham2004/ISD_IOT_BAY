import { db } from "@/lib/db";
import styles from "../../styles/itemList.module.css";
import ListProduct from "./_action/ListProduct";

async function getProducts() {
  const products = await db.product.findMany({
   
  });
  return products;
}

export default async function Products() {
  const products = await getProducts();
  return (
    <div className={styles.wrap}>
      {products.map((product: any) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
}
