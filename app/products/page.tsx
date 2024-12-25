import { DataTable } from "../_components/ui/datatable";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "./_actions/get-products";
import AddProductButton from "./_components/add-product-button";

const Products = async () => {
  const products = await getProducts();
  return (
    <div className="w-full space-y-8 p-8">
      {/* ESQUERDA */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-primary-light text-sm font-semibold">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <AddProductButton />
      </div>
      <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
      {/* DIREITA */}
    </div>
  );
};

export default Products;
