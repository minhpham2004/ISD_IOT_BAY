"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { proceedPayment } from "../_actions/proceedPayment";
import {
  getOrderById,
  updateOrderStatus,
} from "@/app/Home/[id]/_actions/orderActions";
import { useRouter } from "next/navigation";
import { Order, Product } from "@prisma/client";
import { getProductById } from "@/app/staff/products/[id]/_actions/getProductById";
import { updateProductStock } from "@/app/staff/products/[id]/_actions/editProduct";

function PaymentCheckout({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productOrder, setProductOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getProductForOrder = async () => {
      const order = await getOrderById(orderId);
      setProductOrder(order);
      if (order) {
        const fetchProduct = await getProductById(order.productId);
        setProduct(fetchProduct);
      } else {
        toast.error("No order found");
      }
    };

    getProductForOrder();
  }, []);

  const handleProceedPayment = async () => {
    try {
      const cardDetailJSON = localStorage.getItem("paymentMethod");
      if (cardDetailJSON == "none") {
        toast.error("Please choose a payment method");
      }

      const cardDetail = cardDetailJSON && JSON.parse(cardDetailJSON);

      if (product && productOrder) {
        console.log( product?.price * productOrder?.productNumber)
        const paymentDetail = {
          cardNumber: Number.parseInt(cardDetail.cardNumber),
          cardPassword: Number.parseInt(cardDetail.cardPassword),
          cardName: cardDetail.cardName,
          paymentAmount: product?.price * productOrder?.productNumber,
        };

        await proceedPayment(paymentDetail, orderId);

        toast.success("Payment is accepted");
        localStorage.removeItem("cardDetails");
        localStorage.removeItem("paymentMethod");

        await updateOrderStatus(orderId);

        //update stock
        const stockRemaining = product?.stock - productOrder?.productNumber;
        await updateProductStock(product?.id, stockRemaining);
      }

      router.push("/Home");
    } catch (e) {
      toast.error("Payment failed");
    }
  };

  return (
    <Card className="p-2 flex flex-col">
      <CardHeader>
        <CardTitle>Payment Checkout</CardTitle>
        <CardDescription>Order Information</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Product Name: {product?.name}</p>
        <p>Product Price: ${product?.price}</p>
        <p>Purchasing Quantity: {productOrder?.productNumber}</p>

        <p style={{marginTop: '10px', fontWeight: 600}}>
          Total Payment:{" "} $
          {product &&
            productOrder &&
            product?.price * productOrder?.productNumber}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleProceedPayment}
          variant="secondary"
          className="justify-between items-center gap-4 hover:bg-sky-800 bg-sky-700 w-50 duration-1000 delay-1000 ease-in-out"
          style={{
            color: "white",
            transition: "width 2s ease-in-out, background-color 0.3s ease",
            transitionProperty:
              "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "150ms",
          }}
        >
          Checkout
          <ArrowRight className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PaymentCheckout;
