import { ExtendedUser } from "@/next-auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-96 text-center md:w-[600px]">
      <CardHeader>
        <CardTitle className="font-semibold">{label}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-center">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Nome</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-2 text-xs">
            {user?.name}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-2 text-xs">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-2 text-xs">
            {user?.id}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Status</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-2 text-xs">
            {user?.role === "USER" ? "Usuário" : "Administrador"}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "Ativado" : "Desativado"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
