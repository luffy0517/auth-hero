"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbDoorExit } from "react-icons/tb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <PiUserCircleDuotone size={30} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 mt-2">
        <LogoutButton>
          <DropdownMenuItem className="w-full flex items-center justify-center cursor-pointer">
            Logout <TbDoorExit className="ml-2" size={25} />
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
