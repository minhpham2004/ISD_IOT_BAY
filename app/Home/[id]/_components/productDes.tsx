"use client";
import { useState } from "react";
import styles from "../../../../styles/itemInfo.module.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOrder } from "../_actions/orderActions";

interface ItemProps {
  name: string;
  price: number;
  imageUrl: string;
  id: string;
  description: string;
  stock: number;
}

export default function ItemDetail({
  name,
  price,
  imageUrl,
  id,
  description,
  stock,
}: ItemProps) {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleAddToOrderList = async () => {
    if (quantity > 0) {
      const productId = id;
      const userId = localStorage.getItem("userId");
      if (userId) {
        await createOrder(productId, userId, quantity);
        toast.message("Order Added!");
      } else {
        toast.error("No user is found");
      }

      router.push("/Home");
    } else {
      toast.error("Quantity must be greater than 0 to add to order list");
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={imageUrl} alt={name}></img>
      </div>
      <div className={styles.desWrap}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>Price: ${price}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.qtySection}>
          <button className={styles.circle} onClick={handleDecrease}>
            -
          </button>
          <div className={styles.qty}>{quantity}</div>
          <button
            className={styles.circle}
            onClick={handleIncrease}
            disabled={quantity > stock - 1}
          >
            +
          </button>
          {quantity > stock - 1 && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              This product has out of stock, you cannot add anymmore
            </span>
          )}
        </div>
        <button className={styles.addCart} onClick={handleAddToOrderList}>
          Add to order list
        </button>
      </div>
    </div>
  );
}
