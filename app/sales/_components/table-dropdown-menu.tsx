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
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet } from "@/app/_components/ui/sheet";
import {
  CopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Sale } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import deleteSale from "../_actions/delete-sale";
import UpsertSheetContent from "./upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/products/_actions/get-products";
import { GetSalesDto } from "../_actions/get-sale/get-sales";

interface SalesTableDropdownMenuProps {
  sale: Pick<GetSalesDto, "id" | "saleProducts"> & {
    productOptions: ComboboxOption[];
    products: ProductDto[];
  };
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência");
  };

  const handleDelete = () => {
    setDropdownOpen(false);
    deleteSale(sale.id);
    toast.success("Venda excluída com sucesso");
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={copyToClipboard} className="gap-2">
            <CopyIcon size={16} />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSheetOpen(true);
              setDropdownOpen(false);
            }}
            className="gap-2"
          >
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setAlertOpen(true);
              setDropdownOpen(false);
            }}
            className="gap-2"
          >
            <TrashIcon size={16} />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <UpsertSheetContent
          sale={sale}
          productOptions={sale.productOptions}
          products={sale.products}
          onSubmitSuccess={() => setSheetOpen(false)}
          defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
            id: saleProduct.productId,
            name:
              sale.products.find((p) => p.id === saleProduct.productId)?.name ||
              "",
            quantity: Number(saleProduct.quantity),
            price: Number(saleProduct.unitPrice),
          }))}
        />
      </Sheet>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir venda</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta venda?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SalesTableDropdownMenu;
