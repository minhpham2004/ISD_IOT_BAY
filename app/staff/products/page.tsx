import { StaffManageProductTable } from "./_components/StaffManageProductTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StaffManageProductPage() {

  return (
    <div>
      <div className="flex justify-between pb-5 align-middle">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold">
          Manage Products
        </h2>
        <Link href="/staff/products/add" passHref>
          <Button className="bg-green-600">Add Product</Button>
        </Link>
      </div>
      <StaffManageProductTable />
    </div>
  );
}
