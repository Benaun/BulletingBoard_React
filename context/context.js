import { createContext, useState } from 'react';

export const Context = createContext();

export function UsersProvider({ children }) {
  const [auth, setAuth] = useState('');

  return (
    <Context.Provider value={[auth, setAuth]}>{children}</Context.Provider>
  );
}