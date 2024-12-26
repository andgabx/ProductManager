"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product ID");
  }

  try {
    await db.product.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}
