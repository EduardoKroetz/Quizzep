// src/hooks/useQuizzes
"use client"

import { Quizz } from "@/app/interfaces/interfaces";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface QuizzContextProps {
  quizzes: Quizz[] | undefined;
  setQuizzes: Dispatch<SetStateAction<Quizz[] | undefined>>
}

const QuizzesContext = createContext<QuizzContextProps>({quizzes:undefined,setQuizzes:()=> {}})

export const QuizzesContextProvider = (props:{
  children:ReactNode
})=>{
  const [quizzes,setQuizzes] = useState<Quizz[] | undefined>()

  useEffect(()=>{
    const fetchQuizzes = async() =>{
      const quizzes : Quizz[] = await fetch("http://localhost:3001/quizzes").then(res => res.json())
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