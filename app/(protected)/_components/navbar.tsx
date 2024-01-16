"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsersCog } from "react-icons/fa";
import { TbServerCog, TbAdjustmentsCog } from "react-icons/tb";
import { MdAdminPanelSettings } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full">
      <nav className="mx-auto flex h-full max-w-sm items-center justify-center rounded-xl bg-white p-4 md:max-w-md lg:max-w-lg">
        <div className="mx-auto flex items-center justify-center gap-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  size={"lg"}
                  variant={pathname === "/admin" ? "default" : "outline"}
                >
                  <Link href="/admin">
                    <MdAdminPanelSettings size={25} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Administrador</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  size={"lg"}
                  variant={pathname === "/server" ? "default" : "outline"}
                >
                  <Link href="/server">
                    <TbServerCog size={25} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Servidor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  size={"lg"}
                  variant={pathname === "/client" ? "default" : "outline"}
                >
                  <Link href="/client">
                    <FaUsersCog size={25} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cliente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  size={"lg"}
                  variant={pathname === "/settings" ? "default" : "outline"}
                >
                  <Link href="/settings">
                    <TbAdjustmentsCog size={25} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configurações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
};
