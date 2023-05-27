import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className='flex items-center justify-center'>
      <button onClick={handleSignOut}>Cerrar Sesion</button>
    </div>
  );
};

export default SignOut;

