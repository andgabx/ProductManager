import SidebarButtons from "./sidebar-buttons";
import {
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="bg-primary-light w-96">
      <div className="items-center p-6 flex gap-2">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
        <h1 className="text-2xl font-bold text-white">STOCKMANAGER</h1>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <SidebarButtons
          icon={<LayoutGridIcon size={24} />}
          label="Dashboard"
          href="/"
        />
        <SidebarButtons
          icon={<PackageIcon size={24} />}
          label="Produtos"
          href="/products"
        />
        <SidebarButtons
          icon={<ShoppingBasketIcon size={24} />}
          label="Vendas"
          href="/sales"
        />
      </div>
    </div>
  );
};

export default Sidebar;
