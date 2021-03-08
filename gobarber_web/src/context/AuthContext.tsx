import React, { createContext, useCallback } from 'react';

import api from '../services/api';

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextState {
  name: string;
  signIn(credetials: SignInProps): Promise<void>; 
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {

  const signIn = useCallback( async ({ email, password }: SignInProps) => {
    const response = await api.post('/sessions', {
      email, password
    });

    console.log(response);
    
  }, []);

  return(
    <AuthContext.Provider value={{ name: '', signIn }}>
      { children }
    </AuthContext.Provider>
  )
};
