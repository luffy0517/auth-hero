"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FiLogIn } from "react-icons/fi";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { BsShieldLock } from "react-icons/bs";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email já utilizado por outro provedor!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Ocorreu um erro ao fazer login!"));
    });
  };

  return (
    <CardWrapper
      headerLabel={`${
        showTwoFactor
          ? "Favor digitar o código de autenticação de dois fatores  enviado no seu email para prosseguir com o seu login"
          : "Bem-vindo ao AuthHero - Faça login para acessar sua conta"
      }`}
      backButtonLabel="Não possui uma conta? Registre-se agora"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Código de Autentificação
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Insira o seu código de autentificação"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="email"
                          placeholder="Insira o seu email"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                          placeholder="Insira a sua senha"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                      <Button
                        size={"sm"}
                        variant={"link"}
                        asChild
                        className="flex justify-center px-0 font-normal text-black"
                      >
                        <Link href="/auth/reset">
                          Esqueceu sua senha? Clique aqui
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            size={"lg"}
            variant={"default"}
            className="w-full"
            disabled={isPending}
          >
            {showTwoFactor ? "Confirmar" : "Login"}
            {!showTwoFactor && <FiLogIn className="ml-2" size={20} />}
            {showTwoFactor && <BsShieldLock className="ml-2" size={20} />}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2">
          <Separator className="mt-5 flex flex-1" />
          <p className="mt-5 flex flex-1 items-center justify-center whitespace-nowrap text-xs">
            Fazer login com
          </p>
          <Separator className="mt-5 flex flex-1" />
        </div>
      </Form>
    </CardWrapper>
  );
};
