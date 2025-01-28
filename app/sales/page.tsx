import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../_components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { Suspense } from "react";
import LoadingSpinner from "../_components/ui/loading-spinner";

const Sales = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >

      {/* Conteudo da pagina */}

      <div className="w-full space-y-8 p-8">
        {/* ESQUERDA */}
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-primary-light">
              Gestão de Vendas
            </span>
            <h2 className="text-xl font-semibold">Produtos</h2>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2 text-white">
                <PlusIcon className="size-4" />
                Nova Venda
              </Button>
            </SheetTrigger>
            <UpsertSheetContent />
          </Sheet>
        </div>
      </div>

      {/* Fim do conteudo da pagina */}
      
    </Suspense>
  );
};

export default Sales;
