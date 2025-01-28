import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogDescription } from "@/app/_components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

const InfoDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sobre o Stock Manager</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          O Stock Manager é um sistema de gerenciamento de estoque que permite
          você gerenciar seus produtos de forma eficiente.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
