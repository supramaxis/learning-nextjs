import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';

type Variant = 'login' | 'register';
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('login');
  const [isLoading, setIsLoading] = useState(false);

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
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);
    if (variant === 'register') {
      // login axios
    }
    if (variant === 'login') {
      // register nextauth
    }
    console.log(data);
    setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    //nextauth social login
  };
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className='bg-white
         px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'register' && (
            <Input
              id='name'
              label='Name'
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
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'login' ? 'Inicia Sesion' : 'Registrate'}
            </Button>
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
              <span className='px-2 text-gray-500 bg-white'>
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

