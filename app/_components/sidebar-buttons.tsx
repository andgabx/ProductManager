"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/app/_lib/utils";

interface SidebarButtonsProps {
  icon: ReactNode;
  label: string;
  href?: string;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarButtons = ({
  icon,
  label,
  href,
  collapsed,
  onClick,
}: SidebarButtonsProps) => {
  return (
    <Link
      href={href || ""}
      className={cn(
        "flex items-center rounded-lg p-4 text-white transition-colors hover:bg-primary hover:text-white",
        collapsed ? "justify-center" : "gap-4",
      )}
      onClick={onClick}
    >
      <div className="min-w-[24px]">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export default SidebarButtons;
