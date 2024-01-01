"use client"


import { QuizzesContextProvider, useQuizzes } from "@/hooks/useQuizzes";



export default function Home() {
  const { quizzes } = useQuizzes() //Pega todos os quizzes setados no hook useQuizzes(json-server)


  return (
    <h1>Main</h1>
  )
}
