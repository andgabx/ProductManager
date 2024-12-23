"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonsProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SidebarButtons = ({ icon, label, href }: SidebarButtonsProps) => {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname === href ? "default" : "ghost"}
      className="hover:bg-primary justify-start gap-2 text-lg text-white"
      asChild
    >
      <Link className="flex items-center gap-2" href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export default SidebarButtons;
