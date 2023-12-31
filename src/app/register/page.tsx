"use client"

import ErrorToast from "@/components/ErrorToast";
import SuccessToast from "@/components/SuccessToast";
import { FormEvent, useState } from "react";
import styles from "./page.module.css"
import Link from "next/link";
import { User } from "../classes/classes";
import { UserInterface } from "../interfaces/interfaces";
import { useAuth } from "@/hooks/useAuth";




export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [toastSucessIsOpen,setToastSucessIsOpen] = useState(false)
  const [toastErrorIsOpen,setToastErrorIsOpen] = useState(false)

  const { setIsAuthenticated } = useAuth()

  async function handlerRegister(ev:FormEvent){
    ev.preventDefault()

    const newUser = new User(name,email,password,[])

    const users: UserInterface[] = await fetch("http://localhost:3001/users").then(res => res.json())
    const userFound = users.find((user)=> user.email === email && user.password === password)
    if (userFound){
      setToastErrorIsOpen(true)
      return
    }

    const response = await fetch("http://localhost:3001/users",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const { id }= await response.json()
    newUser.id = id

    localStorage.setItem('user',JSON.stringify(newUser))
    setIsAuthenticated(true)
    
    setToastSucessIsOpen(true)
    setTimeout(()=>{
      window.open("../", "_self")
    },500)
  }

  return (
    <div className={`${styles.loginContainer} row p-5 container-fluid`}>
      

      <section className="col-12 col-md-6">
        <h1>Quizzep</h1>
        <p>Se cadastre para ter acesso aos diversos tipos de quiz criados pela comunidade do Quizeep!</p>
      </section>

      <form className={`${styles.loginForm} col-12 col-md-6`}  onSubmit={(ev)=> handlerRegister(ev)}>
        <div className="mb-3">
          <label htmlFor="nameRegister" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nameRegister" aria-describedby="emailHelp"
          value={name}
          autoComplete="name"
          onChange={(ev)=> setName(ev.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailRegister" className="form-label">Email</label>
          <input type="email" className="form-control" id="emailRegister" aria-describedby="emailHelp"
          value={email}
          autoComplete="email"
          onChange={(ev)=> setEmail(ev.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordRegister" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordRegister" 
          value={password}
          autoComplete="password"
          onChange={(ev)=> setPassword(ev.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Criar nova conta</button>
        <hr />
        <Link href={'../login'}><button type="button" className="btn btn-success">Entrar</button></Link>
      
      </form>
 

      <SuccessToast text="Usuário registrado com sucesso!" toastIsOpen={toastSucessIsOpen} setToastIsOpen={setToastSucessIsOpen}/>
      <ErrorToast text="O email ou senha que você inseriu já está conectado à uma conta."  toastIsOpen={toastErrorIsOpen} setToastIsOpen={setToastErrorIsOpen}/>
    </div>
  )
}