import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/app/_components/ui/alert-dialog";

import { DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { Dialog } from "@/app/_components/ui/dialog";

import { CopyIcon, EditIcon, TrashIcon } from "lucide-react";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import DeleteDialog from "@/app/products/_components/delete-dialog";
import UpsertDialog from "@/app/products/_components/upsert-dialog";
import { Sale } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import deleteSale from "../_actions/delete-sale";

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência");
  };

  const handleDelete = () => {
    setOpen(true);
    setDropdownOpen(false);
    deleteSale(sale.id);
    toast.success("Venda excluída com sucesso");
  };

  return (
    <AlertDialog>
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

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir venda</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esta venda?
          </AlertDialogDescription>

        </AlertDialogHeader>
        <AlertDialogFooter>

          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="text-white"
          >

            Excluir

          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SalesTableDropdownMenu;
