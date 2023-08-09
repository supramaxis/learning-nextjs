import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { Button } from "@/components/ui/button";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div>
      <Button onClick={handleSignOut}>
        <LuLogOut /> Cerrar Sesion
      </Button>
    </div>
  );
};

export default SignOut;
