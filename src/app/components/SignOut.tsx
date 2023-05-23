import { Button, Center, Container } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <Container>
      <Center h='100px'>
        <Button onClick={handleSignOut}>Cerrar Sesion</Button>
      </Center>
    </Container>
  );
};

export default SignOut;

