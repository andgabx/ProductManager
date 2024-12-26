import { AlertDialogAction } from "@/app/_components/ui/alert-dialog";

import {
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/app/_components/ui/alert-dialog";

import { AlertDialogContent } from "@/app/_components/ui/alert-dialog";
import { deleteProduct } from "../_actions/delete-product";
import { toast } from "sonner";

interface DeleteDialogProps {
  id: string;
}

const DeleteDialog = ({ id }: DeleteDialogProps) => {
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id);
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir produto");
      console.error(error);
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Excluir produto</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja excluir este produto?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteProduct} className="text-white">
          Excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialog;
