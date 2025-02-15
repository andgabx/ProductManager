"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { SheetTrigger } from "@/app/_components/ui/sheet";
import { Sheet } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ProductDto } from "@/app/products/_actions/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface CreateSaleButtonProps {
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-white"
      >
        <PlusIcon className="size-4" />
        Nova Venda
      </Button>

      <UpsertSheetContent
        sale={undefined}
        {...props}
        onSubmitSuccess={() => setOpen(false)}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
