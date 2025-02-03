import { Button } from "@/app/_components/ui/button";
import { DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  CopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Product } from "@prisma/client";

interface SalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const SalesTableDropdownMenu = ({
  product,
  onDelete,
}: SalesTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xl" asChild>

        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <CopyIcon size={16} />
          Copiar Id
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => onDelete(product.id)}
        >
          <TrashIcon size={16} />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropdownMenu;
