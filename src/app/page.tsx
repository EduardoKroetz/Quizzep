"use client"
//src/app/page.tsx

import { QuizzesContextProvider, useQuizzes } from "@/hooks/useQuizzes";
import { useEffect } from "react";
import styles from "./page.module.css"
import Link from "next/link";
import Header from "@/components/Header";


export default function Home() {
  const { quizzes } = useQuizzes() //Pega todos os quizzes setados no hook useQuizzes(json-server)



  return (
    <>
      <Header/>
      <main className="p-1">
        <h2 className="m-auto text-center my-3">Navege pelos quizzes criados pela Comunidade!</h2>
        <main className={`${styles.quizzes} row p-0 m-0`}>
          {quizzes?.map((quiz)=>(
            <section className={`${styles.quiz}  p-3 col-sm-4 col-md-3`}>
              <div>
                <h4>{quiz.title}</h4>
                <p><span>Categoria:</span> {quiz.category}</p>
                <p><span>Descrição:</span> {quiz.description}</p>
                <p><span>Tempo do quiz:</span>{quiz.time}s</p>
                <p><span>Criado por:</span> {quiz.createdBy}</p>
              </div>
              <div>
                <Link href={`/quizzes/${quiz.id}`}><button type="button" className="btn btn-success">Jogar</button></Link>
              </div>   
            </section>
          ))}
        </main>
      </main>
    </>
  )
}
