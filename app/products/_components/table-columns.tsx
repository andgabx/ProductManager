"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import {
  CopyIcon,
  Delete,
  EditIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import DeleteDialog from "./delete-dialog";
import UpsertDialog from "./upsert-dialog";
import { toast } from "sonner";
import { useState } from "react";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const product = row.original;
      return <span>R$ {Number(product.price).toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    // Computed Field!!!
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Badge
          className={product.stock > 0 ? "bg-green-500/90" : "bg-red-500/90"}
        >
          {product.stock > 0 ? "Em estoque" : "Fora de estoque"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;
      const [open, setOpen] = useState(false);

      return (
        <>
          <AlertDialog>
            <Dialog open={open} onOpenChange={setOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-xl" asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => navigator.clipboard.writeText(product.id)}
                  >
                    <CopyIcon size={16} />
                    Copiar Id
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="gap-2">
                      <EditIcon size={16} />
                      Editar
                    </DropdownMenuItem>
                  </DialogTrigger>
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
    },
  },
];
