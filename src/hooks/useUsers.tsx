// src/hooks/useUsers
"use client"

import { Quizz, UserInterface } from "@/interfaces/interfaces";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface UserContextProps {
  user: UserInterface | undefined;
  setUser: Dispatch<SetStateAction<UserInterface | undefined>>;
}

const UserContext = createContext<UserContextProps>({user:undefined,setUser:()=> {}})

export const UserContextProvider = (props:{
  children:ReactNode
})=>{
  const [user,setUser] = useState<UserInterface | undefined>()

  return (
    <UserContext.Provider value={{user,setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)