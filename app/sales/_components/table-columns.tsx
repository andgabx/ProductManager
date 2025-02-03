"use client";

import { Sale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import ProductDropdownActions from "@/app/products/_components/product-dropdown-actions";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { GetSalesDto } from "../_actions/get-sales";

export const saleTableColumns: ColumnDef<GetSalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",


  },

  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
    cell: ({ row }) => {
      const product = row.original;
      return <span>{product.totalProducts}</span>;
    },
  },


  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const product = row.original;
      return <span>{product.date.toLocaleDateString()}</span>;
    },
  },
  {
    // Computed Field!!!
    accessorKey: "totalPrice",
    header: "Valor Total",
    cell: ({ row: { original: { totalPrice } } }) => {
      return <span>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalPrice)}</span>;
    },

  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon size={16} />
        </Button>
      );
    },
  },
];
