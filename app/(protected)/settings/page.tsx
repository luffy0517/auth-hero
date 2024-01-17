"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FaCogs } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { LuFileCheck2 } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Aconteceu algum problema!"));
    });
  };

  return (
    <Card className="w-96 md:w-[600px]">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-center gap-x-4 font-semibold">
          Configurações <FaCogs size={25} />
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Nome</FormLabel>
                      <FormDescription>
                        Utilize o campo abaixo para alterar o seu nome no
                        cadastro
                      </FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          disabled={isPending}
                          placeholder="Insira o novo nome"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormDescription>
                        Utilize o campo abaixo para alterar o seu email no
                        cadastro.
                      </FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          disabled={isPending}
                          placeholder="Insira o novo nome"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                /> */}

                {user?.isOAuth === false && (
                  <div className="grid grid-cols-2 gap-x-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Senha</FormLabel>

                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="off"
                              disabled={isPending}
                              placeholder="Insira a senha atual"
                              type="password"
                            />
                          </FormControl>
                          <FormDescription>
                            Insira a senha atual
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Nova senha</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="off"
                              disabled={isPending}
                              placeholder="Insira a nova senha"
                              type="password"
                            />
                          </FormControl>
                          <FormDescription>Insira a nova senha</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {user?.isOAuth === false && (
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Autenticação de 2 Fatores</FormLabel>
                          <FormDescription>
                            Ative a autenticação de 2 fatores para a sua conta
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                type="submit"
                size={"lg"}
                variant={"default"}
                className="w-full"
                disabled={isPending}
              >
                Salvar
                <LuFileCheck2 className="ml-2" size={20} />
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default SettingsPage;
