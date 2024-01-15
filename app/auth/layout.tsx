import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-auto min-h-screen py-3 flex-col items-center justify-center bg-[url('/bglogin.png')] bg-cover bg-center bg-no-repeat text-white">{children}</div>;
};

export default AuthLayout;
