"use client";

import React, { useState } from "react";
import { StaffManageProductTable } from "./_components/StaffManageProductTable";
import StaffAddProductModal from "./_components/StaffAddProductModal";
import { Button } from "@/components/ui/button";

export default function StaffManageProductPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <div>
      <div className="flex justify-between pb-5 align-middle">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold">
          Manage Products
        </h2>
        <Button onClick={() => setIsOpen(true)}>Add Product</Button>
      </div>
      <StaffManageProductTable />
      {isOpen && <StaffAddProductModal isOpen={isOpen} handleClose={handleClose} />}
    </div>
  );
}
