"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import ProductDropdownActions from "./product-dropdown-actions";

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
      return <ProductDropdownActions product={row.original} />;
    },
  },
];
