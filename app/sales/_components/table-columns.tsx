"use client";

import { Product, Sale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import ProductDropdownActions from "@/app/products/_components/product-dropdown-actions";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { GetSalesDto } from "../_actions/get-sale/get-sales";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/products/_actions/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumnsProps extends GetSalesDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<GetSalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
    cell: ({ row }) => {
      const product = row.original;
      return <span>{product.productNames.join(" ● ")}</span>;
    },
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
      return <span>{new Date(product.date).toLocaleDateString()}</span>;
    },
  },
  {
    // Computed Field!!!
    accessorKey: "totalPrice",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalPrice },
      },
    }) => {
      return (
        <span>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPrice)}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <SalesTableDropdownMenu
          productOptions={row.original.productOptions}
          products={row.original.products}
          sale={row.original}
        />
      );
    },
  },
];
