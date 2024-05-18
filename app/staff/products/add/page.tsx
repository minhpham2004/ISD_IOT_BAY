"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadProduct } from "./actions";

export default function AddProduct() {
  return (
    <div>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
        <Input name="name" type="text" required placeholder="Name" />
        <Input name="price" type="float" required placeholder="Price" />
        <Input
          name="description"
          type="text"
          required
          placeholder="Description"
        />
        <Input name="imageUrl" type="text" required placeholder="ImageUrl" />
        <Input name="stock" type="number" required placeholder="Stock" />
        <Input name="type" type="text" required placeholder="Type" />

        <Button className="bg-green-600">Add Product</Button>
      </form>
    </div>
  );
}
