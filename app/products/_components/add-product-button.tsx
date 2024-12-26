"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpsertDialog from "./upsert-dialog";

const AddProductButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 text-white">
          <PlusIcon size={16} />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <UpsertDialog />
    </Dialog>
  );
};

export default AddProductButton;
