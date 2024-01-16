import { auth } from "@/auth";

export const useCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};
