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
import { Dialog } from "@/app/_components/ui/dialog";
import DeleteDialog from "./delete-dialog";

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
      return (
        
        <>
          <Dialog>
            <AlertDialog>
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
                  <DropdownMenuItem className="gap-2">
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

              <DeleteDialog id={product.id} />
            </AlertDialog>
          </Dialog>
        </>
      );
    },
  },
];
