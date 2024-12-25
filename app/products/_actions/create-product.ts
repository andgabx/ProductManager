"use server"; // qualquer coisa que for feita aqui, vai ser executada no servidor

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async ({
  name,
  price,
  stock,
}: {
  name: string;
  price: number;
  stock: number;
}) => {
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  revalidatePath("/products");
};
