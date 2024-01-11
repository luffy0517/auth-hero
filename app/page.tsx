import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { TbDoorEnter } from "react-icons/tb";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[url('/bghome.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white mx-5 py-5 rounded-3xl">
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
          <LoginButton>
            <Button size={"lg"} variant={"default"} className="w-full">
              Acessar <TbDoorEnter className="ml-2" size={20} />
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
