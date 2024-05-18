"use server";

import { db } from "@/lib/db";

export const createOrder = async (
  productId: string,
  userId: string,
  quantity: number
) => {
  const res = await db.order.create({
    data: {
      userId: userId,
      productId: productId,
      productNumber: quantity,
      status: false,
    },
  });

  return res;
};

export const getAllOrderList = async (userId: string) => {
  const allUsersOrderList = await db.order.findMany({
    where: {
      userId,
    },
  });

  return allUsersOrderList;
};

export const getOrderById = async (orderId: string) => {
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  return order;
};

export const updateOrderStatus = async (orderId: string) => {
  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: true,
    },
  });
};

export const deleteOrder = async (orderId: string) => {
  await db.order.delete({
    where: {
      id: orderId,
    },
  });
};
