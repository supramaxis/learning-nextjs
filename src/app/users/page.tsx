'use client';

import { signOut } from 'next-auth/react';

const Users = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}>
      Cerrar Sesion
    </button>
  );
};

export default Users;

