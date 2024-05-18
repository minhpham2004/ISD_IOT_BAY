import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StaffAddProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function StaffAddProductModal({
  isOpen,
  handleClose,
}: StaffAddProductModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Add a new product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div>
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div>
            <Label htmlFor="username" className="text-right">
              Product Price
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
          <div>
            <Label htmlFor="username" className="text-right">
              Product Description
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
          <div>
            <Label htmlFor="username" className="text-right">
              Product Image
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <Button variant={"ghost"} onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StaffAddProductModal;
