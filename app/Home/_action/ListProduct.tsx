import Link from "next/link";
import styles from "../../../styles/itemList.module.css";
import { Button } from "@/components/ui/button";
interface ListProductProps {
  name: string;
  price: number;
  imageUrl: string;
  id: string;
}
export default function ListProduct({
  name,
  price,
  imageUrl,
  id,
}: ListProductProps) {
  return (
    <Link href={`/Home/${id}`}>
      <div className={styles.itemWrap} style={{ alignItems: "center" }}>
        <img
          className={styles.img}
          src={imageUrl}
          style={{ height: "350px", objectFit: "cover" }}
        ></img>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold">{name}</h2>
        <div className={styles.price}>Price: ${price}</div>
        <Button>Select Item</Button>
      </div>
    </Link>
  );
}
