"use client";

import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }).trim().max(30), // ver a documentacao do zod pela mor
  price: z.number().min(0.01, { message: "Preço é obrigatório" }),
  stock: z.coerce.number().positive().min(0, { message: "Estoque é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddProductButton = () => {
  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon color="#fff" size={16} />
          <span className="text-sm text-white">Novo Produto</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="space-y-4">
              <DialogTitle>Criar Produto</DialogTitle>
              <DialogDescription className="py-2">
                Insira os dados do produto abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary-dark"
                        placeholder="Digite o nome do produto"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço do Produto</FormLabel>
                    <FormControl>
                      <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale={true}
                        decimalScale={2}
                        prefix="R$"
                        allowNegative={false}
                        customInput={Input}
                        className="border-primary-dark"
                        placeholder="Digite o preço do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque do Produto</FormLabel>
                    <FormControl>
                      <NumericFormat
                        allowNegative={false}
                        customInput={Input}
                        className="border-primary-dark"
                        placeholder="Digite o estoque do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="reset" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-primary text-white">
                  Criar Produto
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
