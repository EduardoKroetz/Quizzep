"use client"


import { QuizzesContextProvider, useQuizzes } from "@/hooks/useQuizzes";



export default function Home() {
  const { quizzes } = useQuizzes()


  return (
    <h1>Main</h1>
  )
}
