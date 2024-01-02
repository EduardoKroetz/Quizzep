// src/hooks/useQuizzes
"use client"

import { QuizzInterface } from "@/interfaces/interfaces";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export interface QuizzContextProps {
  quizzes: QuizzInterface[] | undefined;
  setQuizzes: Dispatch<SetStateAction<QuizzInterface[] | undefined>>
}

const QuizzesContext = createContext<QuizzContextProps>({quizzes:undefined,setQuizzes:()=> {}})

export const QuizzesContextProvider = (props:{
  children:ReactNode
})=>{
  const [quizzes,setQuizzes] = useState<QuizzInterface[] | undefined>()

  useEffect(()=>{
    const fetchQuizzes = async() =>{
      const quizzes : QuizzInterface[] = await fetch("http://localhost:3001/quizzes").then(res => res.json())
      setQuizzes(quizzes)
    }

    fetchQuizzes()
  },[])

  
  return (
    <QuizzesContext.Provider value={{quizzes,setQuizzes}}>
      {props.children}
    </QuizzesContext.Provider>
  )
}

export const useQuizzes = () => useContext(QuizzesContext)