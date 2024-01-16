"use client";

import { useCurrentRole } from "@/hooks/user-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="Você não possui permissões de administrador!" />
    );
  }

  return <>{children}</>;
};
