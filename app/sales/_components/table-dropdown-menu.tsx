import { deleteSale } from "@/app/sales/_actions/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/products/_actions/get-products";
import { GetSalesDto } from "../_actions/get-sale/get-sales";

interface SalesTableDropdownMenuProps {
  sale: Pick<GetSalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SalesTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar a venda.");
    },
  });

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência.");
    setDropdownOpen(false);
  };

  const handleConfirmDeleteClick = () => execute({ id: sale.id });

  // Converter os valores decimais antes de passar para o UpsertSheetContent
  const formattedSaleProducts = sale.saleProducts.map((saleProduct) => ({
    ...saleProduct,
    unitPrice: Number(saleProduct.unitPrice),
    product: {
      ...saleProduct.product,
      price: Number(saleProduct.product.price),
    },
  }));

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={handleCopyToClipboardClick}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => {
                setUpsertSheetIsOpen(true);
                setDropdownOpen(false);
              }}
            >
              <EditIcon size={16} />
              Editar
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        sale={{
          ...sale,
          saleProducts: formattedSaleProducts,
        }}
        productOptions={productOptions}
        products={products}
        onSubmitSuccess={() => setUpsertSheetIsOpen(false)}
        defaultSelectedProducts={formattedSaleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.product.name,
          price: Number(saleProduct.unitPrice),
        }))}
      />
    </Sheet>
  );
};

export default SalesTableDropdownMenu;
