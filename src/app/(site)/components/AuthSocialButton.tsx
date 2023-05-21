import React from 'react';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='
      inline-flex
      w-full
      justify-center
      py-2
      px-4
      rounded-md
      bg-gray-800
      text-white
      shadow-sm
      ring-1
      ring-inset
      ring-zinc-300
      hover:bg-zinc-50
      focus:outline-offset-0
    '>
      <Icon />
    </button>
  );
};

export default AuthSocialButton;

