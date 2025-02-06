"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconDashboard,
  IconInfoCircle,
  IconLogout,
  IconPackage,
  IconShoppingCart,
} from "@tabler/icons-react";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/_lib/utils";
import { ArrowRight, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./logo";
import LogoIcon from "./logo-icon";
import { links } from "./links";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Dialog } from "../ui/dialog";
import Intro from "./intro";

interface SidebarDemoProps {
  children: React.ReactNode;
}

export function SidebarDemo({ children }: SidebarDemoProps) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden border border-primary bg-background md:flex-row",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <SidebarLink
                  props={{
                    onClick: (e) => {
                      e.stopPropagation();
                      setDialogOpen(true);
                    },
                  }}
                  link={{
                    label: "Sobre",
                    href: "#",
                    icon: (
                      <IconInfoCircle
                        size={24}
                        className="flex-shrink-0 text-background"
                      />
                    ),
                  }}
                />
              </DialogTrigger>
              <Intro />
            </Dialog>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="mx-8 flex flex-1 p-2">{children}</div>
    </div>
  );
}

export default SidebarDemo;
