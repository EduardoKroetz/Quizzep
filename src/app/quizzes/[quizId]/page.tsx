"use client"

import QuizQuests from "@/components/QuizQuests";
import { QuizzContextProps, useQuizzes } from "@/hooks/useQuizzes";
import Link from "next/link";


interface ParamsQuiz{
  params: {
    quizId:number
  }

}


export default function Quiz({ params :{ quizId}}: ParamsQuiz){
  
  const {quizzes}: QuizzContextProps = useQuizzes() 
  if (!quizzes) {
    return (
      <main className="d-flex justify-content-center align-items-center">
        <h1>Algum erro occoreu ao tentar buscar os quizzes no servidor!</h1>
      </main>
    )
  }
  const quiz = quizzes.find(quiz => quiz.id === +quizId)
  if (!quiz){
    return (
      <main className="d-flex justify-content-center align-items-center">
        <h1>Quiz não encontrado!</h1>
      </main>
    )
  }


  return (
    <main>
      <h1>{quiz?.title.toUpperCase()}</h1>
      <QuizQuests quiz={quiz}/>
      <section>
          <Link href={"../"}><button type="button" className="btn btn-danger me-4">Sair</button></Link>
          <button type="button" className="btn btn-success">Próxima Questão</button>
      </section>
    </main>
  )
}