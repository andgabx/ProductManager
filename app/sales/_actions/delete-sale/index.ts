"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";


const deleteSale = async (saleId: string) => {
  const { id } = DeleteSaleSchema.parse({ id: saleId });
  await db.sale.delete({
    where: {
      id,
    },
  });
  revalidatePath("/sales");

};



export default deleteSale;
