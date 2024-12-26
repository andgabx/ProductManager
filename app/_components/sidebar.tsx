"use client";
import SidebarButtons from "./sidebar-buttons";
import {
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { cn } from "@/app/_lib/utils";
import { useSidebarStore } from "@/app/_components/_actions/use-sidebar-store";

const Sidebar = () => {
  const { isCollapsed, toggleCollapse } = useSidebarStore();

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
    </div>
  );
};

export default Sidebar;
