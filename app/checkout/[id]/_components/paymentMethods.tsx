"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AddNewPaymentForm from "./addNewPaymentForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Payment } from "@prisma/client";

interface PaymentMethodsProps {
  pastPayments: Payment[];
}

type CardType = {
  cardName: string;
  cardNumber: string;
  cardPassword: string;
};

function PaymentMethods({ pastPayments }: PaymentMethodsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("none");
  const [newCard, setNewCard] = useState<CardType>();

  const allPastpaymentDetailArr: CardType[] = pastPayments.map((payment) => ({
    cardName: payment.paymentCardName,
    cardNumber: payment.paymentCardNumber.toString(),
    cardPassword: payment.paymentPassword.toString(),
  }));

  const removeDuplicatePayments = (payments: CardType[]) => {
    const uniquePaymentsMap = new Map<string, CardType>();
    payments.forEach((payment) => {
      const key = `${payment.cardName}-${payment.cardNumber}-${payment.cardPassword}`;
      uniquePaymentsMap.set(key, payment);
    });
    return Array.from(uniquePaymentsMap.values());
  };

  // Get the unique payment details
  const paymentDetailArr = removeDuplicatePayments(allPastpaymentDetailArr);

  useEffect(() => {
    localStorage.setItem("paymentMethod", paymentMethod);
  }, [paymentMethod]);

  useEffect(() => {
    if (newCard) setIsEdit(true);
  });

  const handleDataFromChild = (data: any) => {
    setNewCard(data);
  };

  const handleRadioChange = (value: any) => {
    setPaymentMethod(value);
  };

  const handleDeleteNewAddedPayment = () => {
    localStorage.removeItem("cardDetails");
    setNewCard(undefined);
    setIsEdit(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const FormSchema = z.object({
    type: z.string(),
  });

  const form = useForm<any>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Card className="p-8">
      {isOpen && (
        <AddNewPaymentForm
          isOpen={isOpen}
          isEdit={isEdit}
          handleClose={handleClose}
          onChangeNewCard={handleDataFromChild}
        />
      )}
      <Form {...form}>
        <form className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel style={{ fontSize: "20px", paddingBottom: "5px" }}>
                  Choose your payment detail
                </FormLabel>
                <p
                  style={{
                    fontSize: "12px",
                    paddingBottom: "16px",
                    marginTop: 0,
                  }}
                >
                  (Use existing order or add a new one)
                </p>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleRadioChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {paymentDetailArr.map((paymentDetail: CardType) => {
                      return (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0 rounded-md p-3"
                          style={{
                            minHeight: "60px",
                            width: "100%",
                            backgroundColor: "#E5F7DC",
                          }}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={JSON.stringify(paymentDetail)}
                            />
                          </FormControl>
                          <FormLabel>
                            <h3 className="font-normal mb-3">
                              <span style={{ fontWeight: 700 }}>
                                Card Name:
                              </span>{" "}
                              {paymentDetail.cardName}
                            </h3>
                            <h3 className="font-normal">
                              <span style={{ fontWeight: 700 }}>
                                Card Number:
                              </span>{" "}
                              {paymentDetail.cardNumber}
                            </h3>
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                    {newCard && (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0 rounded-md p-3"
                        style={{
                          minHeight: "60px",
                          width: "100%",
                          backgroundColor: "#E5F7DC",
                        }}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={newCard ? JSON.stringify(newCard) : "none"}
                          />
                        </FormControl>
                        <FormLabel>
                          <h3 className="font-normal mb-3">
                            <span style={{ fontWeight: 700 }}>Card Name:</span>{" "}
                            {newCard.cardName}
                          </h3>
                          <h3 className="font-normal">
                            <span style={{ fontWeight: 700 }}>
                              Card Number:
                            </span>{" "}
                            {newCard.cardNumber}
                          </h3>
                        </FormLabel>
                      </FormItem>
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {!isEdit && (
        <Button onClick={() => setIsOpen(true)} className="my-4">
          Add new payment
        </Button>
      )}
      {isEdit && (
        <div className="flex gap-3">
          <Button onClick={() => setIsOpen(true)} className="my-4">
            Edit new added payment
          </Button>
          <Button
            onClick={handleDeleteNewAddedPayment}
            variant="destructive"
            className="my-4"
          >
            Delete new added payment
          </Button>
        </div>
      )}
    </Card>
  );
}

export default PaymentMethods;
