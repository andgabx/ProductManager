import { db } from "@/app/_lib/prisma";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/products/_actions/get-products";
import { SaleProduct } from "@prisma/client";

export interface GetSalesDto {
  id: string;

  productNames: string[];
  totalProducts: number;
  totalPrice: number;
  date: Date;
  productOptions: ComboboxOption[];
  products: ProductDto[];
  saleProducts: SaleProduct[];
}

export const getSales = async (): Promise<GetSalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return JSON.parse(
    JSON.stringify(
      sales.map((sale) => ({
        id: sale.id,
        productNames: sale.saleProducts.map(
          (saleProduct) => saleProduct.product.name,
        ),
        totalProducts: sale.saleProducts.reduce(
          (acc, saleProduct) => acc + saleProduct.quantity,
          0,
        ),
        totalPrice: sale.saleProducts.reduce(
          (acc, saleProduct) =>
            acc + Number(saleProduct.unitPrice) * saleProduct.quantity,
          0,
        ),
        date: sale.date,
        productOptions: sale.saleProducts.map((sp) => ({
          value: sp.product.id,
          label: sp.product.name,
        })),
        products: sale.saleProducts.map((sp) => ({
          ...sp.product,
          price: Number(sp.product.price),
        })),
        saleProducts: sale.saleProducts.map((sp) => ({
          ...sp,
          unitPrice: Number(sp.unitPrice),
        })),
      })),
    ),
  );
};
