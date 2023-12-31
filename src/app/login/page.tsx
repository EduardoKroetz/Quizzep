"use client"

import ErrorToast from "@/components/ErrorToast";
import SuccessToast from "@/components/SuccessToast";
import { FormEvent, useState } from "react";
import styles from "./page.module.css"
import Link from "next/link";
import { UserInterface } from "../interfaces/interfaces";



export default function Register(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [toastSucessIsOpen,setToastSucessIsOpen] = useState(false)
  const [toastErrorIsOpen,setToastErrorIsOpen] = useState(false)


  async function handlerLogin(ev:FormEvent){
    ev.preventDefault()

    const users: UserInterface[] = await fetch("http://localhost:3001/users").then(res => res.json())
    const userFound = users.find((user)=> user.email === email && user.password === password)
    console.log(userFound)
    if (userFound){
      setToastSucessIsOpen(true)
      setTimeout(()=>{
        window.open("../", "_self")
      },500)
      return
    }

    setToastErrorIsOpen(true)
  }

  return (
    <div className={`${styles.loginContainer} row p-5 container-fluid`}>
      

      <section className="col-12 col-md-6">
        <h1>Quizzep</h1>
        <p>Entre com a sua conta para acessar os diversos quiz criados pela comunidade!</p>
      </section>

      <form className={`${styles.loginForm} col-12 col-md-6`}  onSubmit={(ev)=> handlerLogin(ev)}>
        <div className="mb-3">
          <label htmlFor="emailLogin" className="form-label">Email</label>
          <input type="email" className="form-control" id="emailLogin" aria-describedby="emailHelp"
          value={email}
          autoComplete="email"
          onChange={(ev)=> setEmail(ev.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordLogin" className="form-label">Senha</label>
          <input type="password" className="form-control" id="passwordLogin" 
          value={password}
          autoComplete="password"
          onChange={(ev)=> setPassword(ev.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
        <hr />
        <Link href={'../register'}><button type="button" className="btn btn-success">Criar nova conta</button></Link>
      
      </form>
 

      <SuccessToast text="Login efetuado com sucesso!" toastIsOpen={toastSucessIsOpen} setToastIsOpen={setToastSucessIsOpen}/>
      <ErrorToast text="O email ou senha que você inseriu não está conectado à uma conta"  toastIsOpen={toastErrorIsOpen} setToastIsOpen={setToastErrorIsOpen}/>
    </div>
  )
}