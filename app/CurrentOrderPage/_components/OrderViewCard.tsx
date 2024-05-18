import { useEffect, useState } from "react";
import { getProductById } from "@/app/staff/products/[id]/_actions/getProductById";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";
import { formatDateTime } from "@/lib/formatDateTime";

interface OrderViewCardProps {
  productId: string;
  quantity: number;
  orderId: string;
  orderStatus: boolean;
  purchaseDate: Date;
  handleDeleteOrder: (orderId: string) => void;
}

function OrderViewCard({
  productId,
  quantity,
  orderId,
  orderStatus,
  purchaseDate,
  handleDeleteOrder,
}: OrderViewCardProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const displayedPurchaseDate = formatDateTime(purchaseDate);

  useEffect(() => {
    const getProductForOrder = async () => {
      const product = await getProductById(productId);
      setProduct(product);
    };

    getProductForOrder();
  }, []);

  const onDelete = () => {
    handleDeleteOrder(orderId);
  };

  return (
    <div className="group">
      {product ? (
        <div className="border-2 rounded border-black p-2">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">Order Id: {orderId}</h3>
          <h3 className="mt-4 text-lg text-gray-700">
            Product: {product.name}
          </h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            ${product.price}
          </p>
          <p className="mt-1 text-lg font-medium text-gray-900">
            Quantity: {quantity}
          </p>
          <p className="mt-1 text-lg font-medium text-gray-900">
            Paid on: {displayedPurchaseDate}
          </p>

          {!orderStatus ? (
            <Link href={`/checkout/${orderId}`}>
              <Button className="mt-5">Checkout {"->"}</Button>
            </Link>
          ) : (
            <Button className="mt-5 mr-5 bg-lime-500 hover:bg-lime-500">
              Paid!
            </Button>
          )}

          {!orderStatus ? (
            <Button variant="destructive" onClick={onDelete} className="ml-5">
              Delete order
            </Button>
          ) : (
            <Link href={`/checkout/${orderId}/view`}>
              <Button className="mt-5 bg-cyan-600">View {"->"}</Button>
            </Link>
          )}
        </div>
      ) : (
        <h3>Product is not found</h3>
      )}
    </div>
  );
}

export default OrderViewCard;
