"use client";
import SidebarButtons from "./sidebar-buttons";
import {
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SettingsIcon,
  InfoIcon,
  Link,
} from "lucide-react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { cn } from "@/app/_lib/utils";
import { useSidebarStore } from "@/app/_components/_actions/use-sidebar-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import { useState } from "react";

const Sidebar = () => {
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative bg-primary-light transition-all duration-300",
        isCollapsed ? "w-20" : "w-76",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 p-6",
          isCollapsed && "justify-center",
        )}
      >
        <MdOutlineProductionQuantityLimits size={30} color="#fff" />
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-white">STOCKMANAGER</h1>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <SidebarButtons
          icon={<LayoutGridIcon size={24} />}
          label="Dashboard"
          href="/"
          collapsed={isCollapsed}
        />
        <SidebarButtons
          icon={<PackageIcon size={24} />}
          label="Produtos"
          href="/products"
          collapsed={isCollapsed}
        />
        <SidebarButtons
          icon={<ShoppingBasketIcon size={24} />}
          label="Vendas"
          href="/sales"
          collapsed={isCollapsed}
        />
        <SidebarButtons
          icon={<InfoIcon size={24} />}
          label="Sobre"
          collapsed={isCollapsed}
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-8 rounded-full bg-primary-light p-1.5 transition-colors hover:bg-primary"
      >
        {isCollapsed ? (
          <ChevronRightIcon size={20} color="#fff" />
        ) : (
          <ChevronLeftIcon size={20} color="#fff" />
        )}
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-xl font-semibold text-primary-light">
              Por que criei o Stock Manager?
            </DialogTitle>
            <DialogDescription>
              Decidi criar umm sistema de gerenciamento de estoque que permite
              você gerenciar seus produtos de forma eficiente. Aproveitei e
              treinei meus conhecimentos em Next.js e TypeScript, como a
              manipulação de dados, validação de formulários, e a criação de
              interfaces de usuário.
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
