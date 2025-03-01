"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, Sale } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SalesTableDropdownMenu from "./upsert-table-dropdown-menu";
import { toast } from "sonner";
import { UpsertSale } from "../_actions/upsert-sale";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getProductsForSale } from "../_actions/get-products";
import { ProductDto } from "@/app/products/_actions/get-products";
import { GetSalesDto } from "../_actions/get-sale/get-sales";

const formSchema = z.object({
  productId: z.string().uuid("Selecione um produto"),
  quantity: z.coerce
    .number()
    .positive()
    .int("A quantidade deve ser um número inteiro positivo"),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  sale?: Pick<GetSalesDto, "id" | "saleProducts"> | null;
  onSubmitSuccess: () => void;
  productOptions: ComboboxOption[];
  products: ProductDto[];
  defaultSelectedProducts?: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  sale,
  onSubmitSuccess,
  productOptions = [],
  products = [],
  defaultSelectedProducts = [],
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    defaultSelectedProducts,
  );
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [localProductOptions, setLocalProductOptions] =
    useState<ComboboxOption[]>(productOptions);

  useEffect(() => {
    if (sale) {
      const fetchProducts = async () => {
        const products = await getProductsForSale();
        setLocalProducts(products);
        setLocalProductOptions(
          products.map((product: Product) => ({
            label: product.name,
            value: product.id,
          })),
        );
      };
      fetchProducts();
    }
  }, [sale]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = localProducts?.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          toast.error("Quantidade insuficiente em estoque");
          return currentProducts;
        }
        return currentProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + data.quantity }
            : product,
        );
      }

      const productIsOutOfStock = data.quantity > selectedProduct.stock;

      if (productIsOutOfStock) {
        toast.error("Quantidade insuficiente em estoque");
        return currentProducts;
      }

      return [
        ...currentProducts,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
    form.reset();
  };

  const onDelete = (productId: string) => {
    setSelectedProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const onSubmitSale = async () => {
    try {
      await UpsertSale({
        id: sale?.id,
        products: selectedProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      toast.success(
        sale ? "Venda atualizada com sucesso" : "Venda finalizada com sucesso",
      );
      onSubmitSuccess();
    } catch (error) {
      toast.error(sale ? "Erro ao atualizar venda" : "Erro ao finalizar venda");
    }
  };

  return (
    <SheetContent className="!max-w-xl">
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold text-primary-light">
          {sale ? "Editar Venda" : "Nova Venda"}
        </SheetTitle>
        <SheetDescription>
          Insira as informações da venda e clique em salvar.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    options={localProductOptions}
                    placeholder="Selecione um produto"
                    searchPlaceholder="Buscar produto..."
                    emptyMessage="Nenhum produto encontrado."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2 text-white">
            <PlusIcon size={20} />
            Adicionar
          </Button>
        </form>
      </Form>

      <Table className="max-h-[40vh] overflow-y-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-w-full">
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <SalesTableDropdownMenu product={product} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                selectedProducts.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0,
                ),
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="py-4">
        <Button
          className="w-full text-white"
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
