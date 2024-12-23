import SidebarButtons from "./sidebar-buttons";
import {
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
  Snail,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-primary-light w-64">
      <div className="flex items-center gap-2 px-8 py-6">
        <Snail className="text-white" size={24} />
        <h1 className="text-2xl font-bold text-white">LEIGOPEARLS</h1>
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
