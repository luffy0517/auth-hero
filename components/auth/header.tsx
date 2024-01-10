import logo from "@/public/logo.png";
import Image from "next/image";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Image
        src={logo}
        alt="AuthHero"
        sizes="100vw"
        height={0}
        width={0}
        className="h-auto w-40"
      />
      <p className="mx-auto w-full px-6 font-light text-muted-foreground md:max-w-xl text-center">
        {label}
      </p>
    </div>
  );
};
