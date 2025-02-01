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
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  productId: z.string().uuid("Selecione um produto"),
  quantity: z.coerce
    .number()
    .positive()
    .int("A quantidade deve ser um número inteiro positivo"),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  productOptions: ComboboxOption[];
  products: Product[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  productOptions,
  products,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products?.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        return currentProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + data.quantity }
            : product,
        );
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

  return (
    <SheetContent className="!max-w-xl">
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold text-primary-light">
          Nova Venda
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
                    options={productOptions}
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

      <Table>
        <TableCaption>Produtos selecionados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  );
};

export default UpsertSheetContent;
