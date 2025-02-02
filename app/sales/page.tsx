import LoadingSpinner from "../_components/ui/loading-spinner";
import { getProducts } from "../products/_actions/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import { Product } from "@prisma/client";
import CreateSaleButton from "./_components/create-sale-button";
import { Suspense } from "react";

const Sales = async () => {
  const products = await getProducts();

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
      </div>

      {/* Fim do conteudo da pagina */}
    </Suspense>
  );
};

export default Sales;
