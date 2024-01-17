import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { TbDoorEnter } from "react-icons/tb";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-auto min-h-screen flex-col items-center justify-center bg-[url('/bghome.png')] bg-cover bg-center bg-no-repeat py-3">
      <div className="mx-5 flex flex-col items-center justify-center space-y-6 rounded-3xl bg-white py-5 text-center">
        <Image
          src={logo}
          alt="AuthHero"
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-40"
        />
        <p className="mx-auto w-full px-6 font-light md:max-w-xl">
          Sua solução completa de autenticação, projetada para proporcionar
          segurança de ponta a ponta.
        </p>

        <div className="w-full px-5">
          <LoginButton mode="modal" asChild>
            <Button size={"lg"} variant={"default"} className="w-full">
              Acessar <TbDoorEnter className="ml-2" size={20} />
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
