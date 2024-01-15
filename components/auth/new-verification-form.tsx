"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardContent } from "../ui/card";
import { Header } from "./header";
import { Button } from "../ui/button";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Você não possui um token de confirmação!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Houve um problema com a sua confirmação!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-96 shadow-md">
      <CardHeader>
        <Header label="Confirmando o seu email..." />
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader size={10} />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </CardContent>
      <CardFooter>
        <Link href="/auth/login" className="w-full">
          <Button size={"lg"} variant={"default"} className="w-full">
            Voltar para o login
            <IoReturnDownBackOutline className="ml-2" size={20} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
