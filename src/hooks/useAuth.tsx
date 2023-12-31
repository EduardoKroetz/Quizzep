// src/hooks/useAuth

"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useUser } from "./useUsers";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({isAuthenticated:false,setIsAuthenticated:()=> {}});


export const AuthContextProvider = (props: {
  children: ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  useEffect(()=>{
    if (!isAuthenticated){
      localStorage.removeItem('user')
    }
  },[isAuthenticated])


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);