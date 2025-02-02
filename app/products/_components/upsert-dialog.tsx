"use client";

import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog";

import { Input } from "@/app/_components/ui/input";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/app/_components/ui/form";
import { NumericFormat } from "react-number-format";
import { Button } from "@/app/_components/ui/button";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { upsertProduct } from "../_actions/upsert-product";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpsertDialogProps {
  onSuccess?: () => void;
  defaultValues?: FormSchema & { id?: string };
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }).trim().max(30), // ver a documentacao do zod pela mor
  price: z.number().min(0.01, { message: "Preço é obrigatório" }),
  stock: z.coerce.number().min(0),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertDialog = ({ onSuccess, defaultValues }: UpsertDialogProps) => {
  const isEditing = !!defaultValues?.id;

  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertProduct({
        ...data,
        id: defaultValues?.id,
      });
      onSuccess?.();
      toast.success(
        isEditing
          ? "Produto atualizado com sucesso!"
          : "Produto criado com sucesso!",
      );
    } catch (error) {
      toast.error(
        isEditing ? "Erro ao atualizar produto" : "Erro ao criar produto",
      );
      console.error(error);
    }
  };
  return (
    <DialogContent className="bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="space-y-4">
            <DialogTitle>
              {isEditing ? "Editar Produto" : "Criar Produto"}
            </DialogTitle>
            <DialogDescription className="py-2">
              {isEditing
                ? "Atualize os dados do produto abaixo"
                : "Insira os dados do produto abaixo para criar"}
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
                      onValueChange={(value) => {
                        field.onChange(value.floatValue);
                      }}
                      {...field}
                      onChange={() => {}}
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
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="bg-primary text-white"
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                {isEditing ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDialog;
