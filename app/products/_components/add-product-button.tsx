"use client";

import {
  Dialog,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import UpsertDialog from "./upsert-dialog";




const AddProductButton = () => {
        const [DialogOpen, setDialogOpen] = useState(false);



  return (
    <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon color="#fff" size={16} />
          <span className="text-sm text-white">Novo Produto</span>
        </Button>
      </DialogTrigger>
      <UpsertDialog onSucess={() => setDialogOpen(false)} />

      
    </Dialog>
  );
};

export default AddProductButton;
