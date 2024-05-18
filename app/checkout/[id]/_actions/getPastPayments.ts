"use server";

import { db } from "@/lib/db";
import { formatDate, format } from "date-fns";

export const getPastPayments = async (userId: string, searchDate?: any) => {
  const userOrders = await db.order.findMany({
    where: {
      userId: userId,
    },
  });

  const orderIds = userOrders.map((order) => order.id);

  let allPastPaymentDetail = await db.payment.findMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
  });

  if (searchDate) {
    const filtered = allPastPaymentDetail.filter(
      (payment) =>
        formatDate(new Date(payment.createdAt), "dd/MM/yyyy") ===
        format(new Date(searchDate), "dd/MM/yyyy")
    );

    allPastPaymentDetail = filtered;
  }

  return allPastPaymentDetail;
};

export const getPaymentHistoryByOrderId = async (orderId: string) => {
  const payment = await db.payment.findUnique({
    where: {
      orderId,
    },
  });

  return payment;
};
