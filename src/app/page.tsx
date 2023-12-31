"use client"

import Header from "@/components/Header";
import { AuthContextProvider } from "@/hooks/useAuth";
import { QuizzesContextProvider, useQuizzes } from "@/hooks/useQuizzes";
import { UserContextProvider } from "@/hooks/useUsers";


export default function Home() {
  const { quizzes } = useQuizzes()


  return (
    <AuthContextProvider>
        <QuizzesContextProvider>
            <UserContextProvider>
                <Header/>
            </UserContextProvider>
        </QuizzesContextProvider>
    </AuthContextProvider>
  )
}
