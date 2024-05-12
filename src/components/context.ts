import { createContext, Dispatch, SetStateAction } from 'react';

export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
