import { db } from "@/app/_lib/prisma";

export interface GetSalesDto {
  id: string;
  productNames: string[];
  totalProducts: number;
  totalPrice: number;
  date: Date;
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

  return sales.map((sale) => ({
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
  }));
};
