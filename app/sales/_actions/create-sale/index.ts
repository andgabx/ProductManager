"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { toast } from "sonner";


export const CreateSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });
  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });
    if (!productFromDb) {
      toast.error("Produto não encontrado");
      return;
    }
    const productIsOutOfStock = productFromDb.stock < product.quantity;
    if (productIsOutOfStock) {
      toast.error("Produto fora de estoque");
      return;
    }
    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: productFromDb.stock - product.quantity,
      },
    });
  }
  revalidatePath("/sales");
  return { success: true };
};

