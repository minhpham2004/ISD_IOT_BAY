"use client";
import { useEffect, useState } from "react";
import {
  deleteOrder,
  getAllOrderList,
} from "../Home/[id]/_actions/orderActions";
import { Order } from "@prisma/client";
import OrderViewCard from "./_components/OrderViewCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CurrentOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getAllCurrentOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const allOrders = await getAllOrderList(userId);
      setOrders(allOrders);
    }
  };

  useEffect(() => {
    getAllCurrentOrders();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);

      toast.success("Delete order successfully");
      getAllCurrentOrders();
    } catch (e) {
      toast.error("Edit order successfully");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter orders based on search query
  const filterOrdersById = () => {
    const filter = orders.find(
      (order) => order.id.trim().toString() === searchQuery.trim().toString()
    );

    if (filter) {
      setOrders([filter]);
    } else {
      setOrders([]);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <input
          type="text"
          placeholder="Search by order id"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-5"
        />

        <Button onClick={filterOrdersById} className="bg-emerald-700">
          Find your order
        </Button>
        <Button onClick={getAllCurrentOrders} className="ml-3">
          Reset
        </Button>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-10">
            {orders.map((order, index) => (
              <OrderViewCard
                key={index}
                orderId={order.id}
                orderStatus={order.status}
                productId={order.productId}
                quantity={order.productNumber}
                purchaseDate={order.createdAt}
                handleDeleteOrder={handleDeleteOrder}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10">No order found</div>
        )}
      </div>
    </div>
  );
}
