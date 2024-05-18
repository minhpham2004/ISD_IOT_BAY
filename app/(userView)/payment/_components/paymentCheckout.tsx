"use client";

import React from "react";
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

function PaymentCheckout() {
  const handleProceedPayment = async () => {
    try {
      const cardDetailJSON = localStorage.getItem("cardDetails");
      const cardDetail = cardDetailJSON && JSON.parse(cardDetailJSON);

      const paymentDetail = {
        cardNumber: Number.parseInt(cardDetail.cardNumber),
        cardPassword: Number.parseInt(cardDetail.cardPassword),
        cardName: cardDetail.cardName,
        paymentAmount: 0,
      };

      const res = await proceedPayment(paymentDetail);
      localStorage.removeItem("cardDetails");

    } catch (e) {}
  };

  return (
    <Card className="p-2 flex flex-col">
      <CardHeader>
        <CardTitle>Payment Checkout</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Card Content</p>
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
