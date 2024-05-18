"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import { editProduct, deleteProduct } from "../[id]/_actions/editProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface EditProductForm {
  product: Product;
  productId: string;
}

const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  imageUrl: z.string(),
  stock: z.coerce.number(),
  type: z.string(),
});

export default function EditProductForm({
  product,
  productId,
}: EditProductForm) {
  const [currentProduct] = useState(product);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: currentProduct.name,
      price: currentProduct.price,
      description: currentProduct.description,
      imageUrl: currentProduct.imageUrl,
      stock: currentProduct.stock,
      type: currentProduct.type,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      await editProduct(values, productId);

      toast.success("Edit successfully");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);

      toast.success("Delete product successfully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Product Price" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Fill in your description" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image url" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.imageUrl?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Fill in your stock"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.stock?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Fill in your type" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.type?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className="gap-2">
          <Button className="mr-3 mt-3" type="submit">
            Edit Product
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteProduct(productId)}
          >
            Delete Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
