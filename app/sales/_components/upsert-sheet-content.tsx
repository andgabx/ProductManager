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

    setSelectedProducts((prev) => [
      ...prev,
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        quantity: data.quantity,
      },
    ]);
    form.reset();
  };

  return (
    <SheetContent>
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

      {selectedProducts.map((product) => (
        <p className="text-slate-800" key={product.id}>
          {product.name}
        </p>
      ))}
    </SheetContent>
  );
};

export default UpsertSheetContent;
