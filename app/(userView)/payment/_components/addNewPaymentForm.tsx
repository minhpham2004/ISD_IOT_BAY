"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddNewPaymentFormProps {
  isOpen: boolean;
  isEdit: boolean;
  handleClose: () => void;
  onChangeNewCard: any;
}

function AddNewPaymentForm({
  isOpen,
  isEdit,
  handleClose,
  onChangeNewCard,
}: AddNewPaymentFormProps) {
  const form = useForm<any>({
    defaultValues: {
      cardNumber: "",
      cardPassword: "",
      cardName: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      localStorage.setItem("cardDetails", JSON.stringify(values));
      onChangeNewCard(values);
      toast.success(
        "Add new payment detail successfully. This payment wil be used when checking out"
      );
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your card number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="CVV" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your card name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              {!isEdit ? (
                <Button type="submit">Add new</Button>
              ) : (
                <Button type="submit">Edit</Button>
              )}
              <Button variant={"ghost"} onClick={handleClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewPaymentForm;
