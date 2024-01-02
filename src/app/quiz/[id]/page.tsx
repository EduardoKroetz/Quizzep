"use client"

import { useQuizzes } from "@/hooks/useQuizzes";
import { QuizzInterface } from "@/interfaces/interfaces";
import { useSearchParams } from "next/navigation";


export default function Quiz(){
  
  const  id = Number(useSearchParams())

  const {quizzes} = useQuizzes() as {quizzes:QuizzInterface[]}

  const quiz = quizzes.find((quiz)=>{ quiz.id === id})
 

  return (
    <h1>{quiz?.title}</h1>
  )
}