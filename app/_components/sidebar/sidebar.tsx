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
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./logo";
import LogoIcon from "./logo-icon";
import { links } from "./links";
import { DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Dialog } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface SidebarDemoProps {
  children: React.ReactNode;
}

export function SidebarDemo({ children }: SidebarDemoProps) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-primary bg-background md:flex-row",
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
            <Dialog>
              <DialogTrigger asChild>
                <SidebarLink
                  link={{
                    label: "Sobre",
                    href: "#",
                    icon: (
                      <IconInfoCircle
                        size={24}
                        className="flex-shrink-0 text-primary-dark"
                      />
                    ),
                  }}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Por que criei o Stock Manager?</DialogTitle>
                <span>
                  Decidi criar um sistema de gerenciamento de estoque que
                  permite você gerenciar seus produtos de forma eficiente.
                  Aproveitei e treinei meus conhecimentos em Next.js e
                  TypeScript, como a manipulação de dados, validação de
                  formulários, e a criação de interfaces de usuário.
                </span>
              </DialogContent>
            </Dialog>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1 p-2">{children}</div>
    </div>
  );
}

export default SidebarDemo;
