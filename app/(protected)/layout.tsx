import { Header } from "./_components/header";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <div className="h-full max-h-[15%]">
        <Header />
      </div>
      <div className="flex h-full max-h-[70%] w-full flex-col items-center justify-center gap-y-10 bg-[url('/bghome.png')] bg-cover bg-center bg-no-repeat">
        {children}
      </div>
      <div className="h-full max-h-[15%]">
        <Navbar />
      </div>
    </>
  );
};

export default ProtectedLayout;
