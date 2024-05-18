"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AddNewPaymentForm from "./addNewPaymentForm";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

function PaymentMethods({ pastPayments }: PaymentMethodsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [newCard, setNewCard] = useState();

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
    setIsEdit(false)
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
                <FormLabel style={{ fontSize: "20px", paddingBottom: "16px" }}>
                  Choose your payment detail
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleRadioChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem
                      className="flex items-center space-x-3 space-y-0 rounded-md p-3"
                      style={{
                        minHeight: "60px",
                        width: "100%",
                        backgroundColor: "#E5F7DC",
                      }}
                    >
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        All new messages
                      </FormLabel>
                    </FormItem>
                    <FormItem
                      className="flex items-center space-x-3 space-y-0 rounded-md p-3"
                      style={{
                        minHeight: "60px",
                        width: "100%",
                        backgroundColor: "#E5F7DC",
                      }}
                    >
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Direct messages and mentions
                      </FormLabel>
                    </FormItem>
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
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {JSON.stringify(newCard)}
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
