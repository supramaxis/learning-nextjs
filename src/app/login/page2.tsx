'use client';

import AuthForm from '@/(site)/components/AuthForm';

// authform for login and register

const Login = () => {
  return (
    <div>
      <div
        className='
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gray-700
      '>
        <h2 className='mt-6 text-center text-3xl fond-bold tracking-tight text-gray-900'>
          Inicia Sesion!
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Login;

