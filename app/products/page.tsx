import { DataTable } from "../_components/ui/datatable";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "./_actions/get-products";
import AddProductButton from "./_components/add-product-button";
import { ScrollArea } from "../_components/ui/scroll-area";
import { Suspense } from "react";
import LoadingSpinner from "../_components/ui/loading-spinner";

const Products = async () => {
  const products = await getProducts();
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <div className="w-full space-y-8 p-8">
        {/* ESQUERDA */}
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-primary-light">
              Gestão de Produtos
            </span>
            <h2 className="text-xl font-semibold">Produtos</h2>
          </div>
          <AddProductButton />
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <DataTable
            columns={productTableColumns}
            data={JSON.parse(JSON.stringify(products))}
          />
        </ScrollArea>
      </div>
    </Suspense>
  );
};

export default Products;
