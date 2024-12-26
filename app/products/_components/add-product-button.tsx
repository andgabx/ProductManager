"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpsertDialog from "./upsert-dialog";
import { useState } from "react";

const AddProductButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 text-white">
          <PlusIcon size={16} />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <UpsertDialog onSuccess={() => setOpen(false)} />
    </Dialog>
  );
};

export default AddProductButton;
