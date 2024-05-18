"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Payment } from "@prisma/client";
import { useState, useEffect } from "react";
import { getPastPayments } from "../[id]/_actions/getPastPayments";
import { formatDateTime } from "@/lib/formatDateTime";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";

function ViewAllPaymentsPage() {
  const userId = localStorage.getItem("userId");
  const [pastPayment, setPastPayment] = useState<Payment[]>([]);
  const [date, setDate] = useState<Date | undefined>();

  const getPastPmts = async () => {
    if (userId) {
      const allPastPmts = await getPastPayments(userId, date);
      allPastPmts && setPastPayment(allPastPmts);
    }
  };

  useEffect(() => {
    getPastPmts();
  }, [date]);

  const handleReset = () => {
    getPastPmts();
    setDate(undefined);
  };

  return (
    <>
      <div className="flex align-center mb-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? formatDate(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleReset} className="ml-5 bg-blue-800">
          Reset
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Payment ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Card Name</TableHead>
            <TableHead>Card Number</TableHead>
            <TableHead>CVV</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastPayment.map((payment, index) => {
            const paymentDate = payment && formatDateTime(payment?.createdAt);
            return (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.orderId}</TableCell>
                <TableCell>{payment.paymentCardName}</TableCell>
                <TableCell>{payment.paymentCardNumber}</TableCell>
                <TableCell>{payment.paymentPassword}</TableCell>
                <TableCell>${payment.paymentAmount}</TableCell>
                <TableCell>{paymentDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default ViewAllPaymentsPage;
