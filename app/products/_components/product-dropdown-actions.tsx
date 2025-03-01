import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import { CopyIcon, EditIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/app/_components/ui/dropdown-menu";

import { DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";

import { AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";

import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { Dialog } from "@/app/_components/ui/dialog";
import { DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";
import { useState } from "react";
import { Product } from "@prisma/client";
import DeleteDialog from "./delete-dialog";
import UpsertDialog from "./upsert-dialog";
import { toast } from "sonner";

interface ProductDropdownActionsProps {
  product: Product;
}

const ProductDropdownActions = ({ product }: ProductDropdownActionsProps) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(product.id);
    toast.success("ID copiado para a área de transferência");
  };

  return (
    <>
      <AlertDialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger className="text-xl" asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                className="gap-2"
                onClick={copyToClipboard}
              >
                <CopyIcon size={16} />
                Copiar Id
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setDropdownOpen(false);
                }}
                className="gap-2"
              >
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2">
                <AlertDialogTrigger className="flex gap-2">
                  <TrashIcon size={16} />
                  Excluir
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpsertDialog
            defaultValues={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock,
            }}
            onSuccess={() => setOpen(false)}
          />
          <DeleteDialog id={product.id} />
        </Dialog>
      </AlertDialog>
    </>
  );
};

export default ProductDropdownActions;
