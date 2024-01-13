import { Header } from "@/components/auth/header";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoReturnDownBackOutline } from "react-icons/io5";

export const ErrorCard = () => {
  return (
    <Card className="w-96 shadow-md">
      <CardHeader>
        <Header label="Oops! Aconteceu algum problema! 😞" />
      </CardHeader>
      <CardFooter>
        <Link href="/auth/login" className="w-full">
          <Button size={"lg"} variant={"default"} className="w-full">
            Voltar para o login<IoReturnDownBackOutline className="ml-2" size={20} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
