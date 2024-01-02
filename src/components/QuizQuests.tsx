import { QuizzInterface } from "@/interfaces/interfaces";

export default function QuizQuests( {quiz}: {quiz:QuizzInterface}){

  return (
    <>
      {quiz.questions.map((question)=> {
        <main>
          <h3>{}</h3>
        </main>
      })}
    </>
 
  )
}