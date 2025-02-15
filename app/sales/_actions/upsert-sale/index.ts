"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { toast } from "sonner";

export const UpsertSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);

  // Start a transaction since we're doing multiple operations
  return await db.$transaction(async (tx) => {
    // If updating, first delete existing sale products
    if (data.id) {
      await tx.saleProduct.deleteMany({
        where: { saleId: data.id },
      });
    }

    // Create or update the sale
    const sale = data.id
      ? await tx.sale.update({
          where: { id: data.id },
          data: {
            date: new Date(),
          },
        })
      : await tx.sale.create({
          data: {
            date: new Date(),
          },
        });

    // Process each product
    for (const product of data.products) {
      const productFromDb = await tx.product.findUnique({
        where: {
          id: product.id,
        },
      });

      if (!productFromDb) {
        throw new Error("Produto não encontrado");
      }

      const productIsOutOfStock = productFromDb.stock < product.quantity;
      if (productIsOutOfStock) {
        throw new Error("Produto fora de estoque");
      }

      await tx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: productFromDb.price,
        },
      });

      await tx.product.update({
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
  });
};
