import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await useCurrentUser();

  return (
    <div>
      <UserInfo label="Server Component" user={user} />
    </div>
  );
};

export default ServerPage;
