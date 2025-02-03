import LoadingSpinner from "../_components/ui/loading-spinner";
import { getProducts } from "../products/_actions/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import { Product } from "@prisma/client";
import CreateSaleButton from "./_components/create-sale-button";
import { Suspense } from "react";
import { DataTable } from "../_components/ui/datatable";
import { saleTableColumns } from "./_components/table-columns";
import { getSales } from "./_actions/get-sales";
import { revalidatePath } from "next/cache";

const Sales = async () => {
  const products = await getProducts();
  const sales = await getSales();

  // Faça a sanitização AQUI, antes de passar para o componente cliente
  const sanitizedProducts = JSON.parse(JSON.stringify(products));

  const productOptions: ComboboxOption[] = sanitizedProducts.map(
    (product: Product) => ({
      label: product.name,
      value: product.id,
    }),
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      {/* Conteudo da pagina */}

      <div className="w-full space-y-8 p-8">
        {/* ESQUERDA */}
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-primary-light">
              Gestão de Vendas
            </span>
            <h2 className="text-xl font-semibold">Vendas</h2>
          </div>
          <CreateSaleButton
            productOptions={productOptions}
            products={sanitizedProducts}
          />
        </div>
        <DataTable columns={saleTableColumns} data={sales} />

      </div>


      {/* Fim do conteudo da pagina */}
    </Suspense>
  );
};

export default Sales;
