"use server";

import { db } from "@/app/_lib/prisma";

export async function getProductsForSale() {
  const products = await db.product.findMany({
    orderBy: {
      name: "asc",
    },
  });
  
  const sanitizedProducts = JSON.parse(JSON.stringify(
    products.map(product => ({
      ...product,
      price: Number(product.price)
    }))
  ));
  
  return sanitizedProducts;
} 