'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { InputProps } from '@/types';

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='
          block 
          text-sm 
          font-medium 
          leading-6 
          text-white
        '>
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(
            `form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray
            shadow-sm
            ring-1
            ring-inset
            ring-white
            placeholder:text-white
            focus:ring-2
            focus:ring-inset
            focus:ring-lime-500
            sm:text-sm
            sm:leading-6
            `,
            errors[id] && 'ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
    </div>
  );
};

export default Input;

