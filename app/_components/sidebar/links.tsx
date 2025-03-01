import {
  IconDashboard,
  IconPackage,
  IconInfoCircle,
  IconShoppingCart,
} from "@tabler/icons-react";

export const links = [
  {
    label: "Dashboard",
    href: "/",
    icon: <IconDashboard size={24} className="flex-shrink-0 text-background" />,
  },
  {
    label: "Produtos",
    href: "/products",
    icon: <IconPackage size={24} className="flex-shrink-0 text-background" />,
  },

  {
    label: "Vendas",
    href: "/sales",
    icon: (
      <IconShoppingCart size={24} className="flex-shrink-0 text-background" />
    ),
  },
];
