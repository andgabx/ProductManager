"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertProduct(data: {
  id?: string;
  name: string;
  price: number;
  stock: number;
}) {
  try {
    if (data.id) {
      await db.product.update({
        where: { id: data.id },
        data: {
          name: data.name,
          price: data.price,
          stock: data.stock,
        },
      });
    } else {
      await db.product.create({
        data: {
          name: data.name,
          price: data.price,
          stock: data.stock,
        },
      });
    }

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error upserting product:", error);
    throw new Error("Failed to save product");
  }
}
