"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const user = useCurrentUser();

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Rota API executada com sucesso!");
      } else {
        toast.error("Acesso negado!");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <Card className="w-96 text-center md:w-[600px]">
      <CardHeader>
        <CardTitle className="font-semibold">Painel do Administrador</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-center">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Você possui permissões de administrador!" />

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">ID</p>
            <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-2 text-xs">
              {user?.id}
            </p>
          </div>
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Admin API Route</p>
          <Button
            // disabled={UserRole.USER ? true : false}
            onClick={onApiRouteClick}
          >
            Executar
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Admin Server Action</p>
          <Button
            onClick={onServerActionClick}
            // disabled={UserRole.USER ? true : false}
          >
            Executar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
