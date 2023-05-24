import LoginButton from '@/components/Button';
import Input from '@/components/inputs/Input';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'login' | 'register';
const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('login');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      toast.success(`Bienvenido ${session.data.user.name} `);
      router.push('/');
    } else {
      toast.error('Debes iniciar sesion primero');
      session?.status == 'unauthenticated' ? router.push('/login') : null;
    }
    // console.log(session?.status);
  }, [session?.status, router]);

  //push the user to login page if he is not authenticated

  const toggleVariant = useCallback(() => {
    if (variant === 'login') {
      setVariant('register');
    } else {
      setVariant('login');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);
    if (variant === 'register') {
      // login axios
      try {
        const res = await axios.post('/api/register', data);
        console.log(res.data);
        signIn('credentials', data);
      } catch (error) {
        toast.error('algo salio mal');
      } finally {
        setIsLoading(false);
      }
    }
    if (variant === 'login') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then(callback => {
          if (callback?.error) {
            toast.error('Credenciales incorrectas');
          }

          if (callback?.ok && !callback?.error) {
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
      // register nextauth
    }
    setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error('Credenciales invalidas');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Bienvenido!');
        }
      })
      .finally(() => setIsLoading(false));
    //nextauth social login
  };
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className='bg-gray-800
         px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'register' && (
            <Input
              id='name'
              label='Nombre'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id='email'
            label='Correo electronico'
            type='email'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id='password'
            label='Contraseña'
            type='password'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <LoginButton disabled={isLoading} fullWidth type='submit'>
              {variant === 'login' ? 'Inicia Sesion' : 'Registrate'}
            </LoginButton>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div
              className='
          absolute
          inset-0
          flex
          items-center
          '>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-white bg-gray-800'>
                O inicia sesion con
              </span>
            </div>
          </div>
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className='
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500
        '>
          <div>
            {variant === 'login' ? 'No tienes cuenta?' : 'Ya tienes cuenta?'}
          </div>
          <div
            onClick={toggleVariant}
            className='underline cursor-pointer hover:text-lime-500'>
            {variant === 'login' ? 'Registrate' : 'Inicia Sesion'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

