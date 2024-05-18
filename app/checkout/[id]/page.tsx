"use client";

import { useEffect, useState } from "react";
import { Payment } from "@prisma/client";
import PaymentCheckout from "./_components/paymentCheckout";
import PaymentMethods from "./_components/paymentMethods";
import PaymentSearchBar from "./_components/paymentSearchBar";
import { getPastPayments } from "./_actions/getPastPayments";

function PaymentPage({ params }: { params: { id: string } }) {
  const [pastPayment, setPastPayment] = useState<Payment[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getPastPmts = async () => {
      if (userId) {
        const allPastPmts = await getPastPayments(userId);
        allPastPmts && setPastPayment(allPastPmts);
      }
    };
    getPastPmts();
  }, []);

  const commands = [
    { value: "calendar", label: "Calendar" },
    { value: "search-emoji", label: "Search Emoji" },
    { value: "calculator", label: "Calculator" },
  ];

  return (
    <div style={{ padding: "50px 100px " }}>
      <h2
        className="scroll-m-20 text-3xl font-semibold"
        style={{ paddingBottom: "50px", paddingTop: "30px" }}
      >
        Payment
      </h2>
      <div style={{ paddingBottom: "30px" }}>
        <PaymentSearchBar commands={commands} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "80px",
        }}
      >
        <PaymentMethods pastPayments={pastPayment} />
        <PaymentCheckout orderId={params.id} />
      </div>
    </div>
  );
}

export default PaymentPage;
