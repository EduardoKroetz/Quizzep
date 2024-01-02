"use client"
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUsers";
import Link from "next/link";
import style from "./page.module.css"
import { useAuth } from "@/hooks/useAuth";

export default function Quiz(){
  const { user } = useUser()
  const { setIsAuthenticated } = useAuth()


  function logOut(){
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  if (!user){
    return (
      <>
        <Header/>
        <main className="d-flex justify-content-center align-items-center flex-column">
          <h1>Você não está logado!</h1>
          <Link href={"/login"}><button type="button" className="btn btn-info my-4">Faça login</button></Link>
          <Link href={"/register"}><button type="button" className="btn btn-info">Cadastre-se</button></Link>
        </main>
      </>
  
    )
  }

  return (
    <>
      <Header/>
      <main className={`${style.mainAccount}`}>
        <section>
          <span className="h5">Nome: </span>
          <span>{user?.name}</span>
        </section>
        <section>
          <span className="h5">Email: </span>
          <span>{user?.email}</span>
        </section>
        <section>
        <h5>QUIZZES</h5>
        <table className={`${style.table}`}>
          <thead>
            <tr className={`${style.tr}`}>
              <th className="text-center">Titúlo</th>
              <th className="text-center">Categoria</th>
              <th className="text-center">Descrição</th>
              <th className="text-center">Tempo</th>
            </tr>        
          </thead>
          <tbody>
            {user?.quizzes.map((quiz)=>(
              <tr>
                <td className={`${style.td}`}>{quiz.title}</td>
                <td className={`${style.td}`}>{quiz.category}</td>
                <td className={`${style.td}`}>{quiz.description}</td>
                <td className={`${style.td}`}>{quiz.time}</td>
                <td><Link href={`../quizzes/${quiz.id}`} ><button type="button" className="btn btn-success">Jogar</button></Link></td>
              </tr>
            ))}
          </tbody>
          
        </table>
        </section>
        <button type="button" className="btn btn-danger m-auto" onClick={()=> logOut()}>Logout</button>
      </main>
    </>
  )
}