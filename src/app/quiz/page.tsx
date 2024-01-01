"use client"


import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import styles from "./page.module.css"
import { Question, UserInterface } from "@/interfaces/interfaces"
import "./style.css"
import { useUser } from "@/hooks/useUsers"
import Quizz from "@/classes/Quizz"
import Link from "next/link"

export default function Quiz(){
  const [title,setTitle] = useState('')
  const [category,setCategory] = useState('')
  const [description,setDescription] = useState('')
  const [timeQuiz, setTimeQuiz] = useState(60)
  const [qtdQuests,setQtdQuests] = useState(2)
  const [renderQuestsState,setRenderQuestsState] = useState(false)
  
  const {user,setUser}  = useUser() as {user:UserInterface,setUser:Dispatch<SetStateAction<UserInterface>>}

  //Caso o usuário obtido do localStorage não exista, exibe a mensagem de "Não está logado!"
  if (!user){
    return (
      <>
        <h1>Você não está logado!</h1>
        <Link href={"/login"}><button type="button" className="btn btn-info">Faça login</button></Link>
        <hr />
        <Link href={"/register"}><button type="button" className="btn btn-info">Cadastre-se</button></Link>
      </>
    )
  }


  //Renderiza as quests quando o formulário é enviado
  function renderQuests(ev:FormEvent){
    ev.preventDefault()

    setRenderQuestsState(true)
  }




  //função de criar novo Quiz, pega todos os valores, itera sobre todas as questoes pegando cada valor, joga para um array de questoes e depois salva no usuário e no json-server
  async function createNewQuizz(){
    const arrQuests: Question[] = []
    for (let i=0;i<qtdQuests;i++){

      //pega os valores de questão de acordo com o índice
      const questHtml: HTMLInputElement  | null= document.querySelector(`.quest-${i} > input`) 
      const responsesHtml: NodeListOf<Element> | null = document.querySelectorAll(`.quest-${i} > .responses-container > .responseQuestInput`) 
      const rigthResponseHtml: HTMLInputElement  | null = document.querySelector(`.quest-${i} > .rightResponse-container > input`)

      //verificação se existe(por causa do TS)
      if (questHtml && responsesHtml && rigthResponseHtml){
        const quest = questHtml.value //pergunta principal 
        const rightResponse = rigthResponseHtml.value //resposta correta
        const options = Array.from(responsesHtml).map((response:any ) => response.value); //converte as respostas para um array de string
        arrQuests.push({text:quest,options:options,correctOption:+rightResponse}) //salva cada questao em um array
      }
    }

    const newQuizz = new Quizz(title,category,description,arrQuests,user?.name,timeQuiz) //cria um novo quiz com os dados


    const response = await fetch("http://localhost:3001/quizzes",{
      method:"POST",
      headers: {
        "Content-Type":"applicattion/json"
      },
      body:JSON.stringify(newQuizz)
    })
    const { id } = await response.json()
    newQuizz.id = id

    setUser((prevUser) => {
      if (prevUser) {
        const newUser = { ...prevUser, quizzes: [...prevUser.quizzes, newQuizz] };
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
      }
      return prevUser;
    });
  }




  //Valida a quantidade de questoes do quiz, não deixa o valor abaixo de 2, nem acima de 20
  function validateQtdQuests(ev:ChangeEvent<HTMLInputElement>){
    if (+ev.target.value > 20 || + ev.target.value < 2 ){
      setQtdQuests(2)
      return
    }
    setRenderQuestsState(false)
    setQtdQuests(+ev.target.value)
  }



  return (
    <main className={`${styles.createQuizContainer} row m-0 p-0`}>
      <form onSubmit={(ev)=> renderQuests(ev)} className={`${styles.createQuizForm} createQuizForm col-12 col-md-6`} >
        <section>
          <label htmlFor="title">Título</label>
          <input type="text" id="title"
          className="form-control"
          value={title}
          onChange={(ev)=> {setTitle(ev.target.value)
          setRenderQuestsState(false)}} required
          />
        </section>
        <section>
          <label htmlFor="category">Categoria</label>
          <input type="text" id="category"
          className="form-control"
          value={category}
          onChange={(ev)=> {setCategory(ev.target.value)
          setRenderQuestsState(false)}} required/>
        </section>
        <section>
          <label htmlFor="description">Descrição</label> <br />
          <textarea value={description} id="description" className="form-control" cols={40} rows={5} onChange={(ev)=>{setDescription(ev.target.value)
          setRenderQuestsState(false)}} required></textarea>
        </section>
        <section>
          <label htmlFor="timeQuiz">Tempo do Quiz(segundos)</label>
          <input type="number" id="timeQuiz"
          className="form-control"
          min={15}
          value={timeQuiz}
          onChange={(ev)=> {setTimeQuiz(+ev.target.value)
          setRenderQuestsState(false)}} required/>
        </section>
        <section>
          <label htmlFor="qtdQuests">Quantidade de Perguntas</label>
          <input type="number" id="qtdQuests" min={2} max={20}
          className="form-control"
          value={qtdQuests}
          onChange={(ev)=>  validateQtdQuests(ev)} required/>
        </section>
        <button type="submit" className="btn btn-info">Carregar perguntas</button>
      </form>
      <section className={`${styles.showQuests} col-md-6 col-12`}>
        {renderQuestsState && (
          <> {/* Itera sobre a quantidade de quests e renderiza os componentes */}
            {Array.from({length: qtdQuests},(_,index) => (
              <div key={`question-container-${index}`}>
                <section key={index} className={`quest-${index}`}>
                  <label htmlFor={`question`}>Pergunta {index + 1}</label>
                  <input
                    type="text"
                    id={`question`}
                    className="form-control"
                  />
                  Respostas(1,2,3,4)
                  <div className="row responses-container m-0 p-0">
                    <input type="text" className="col-2 m-1 responseQuestInput"/>
                    <input type="text" className="col-2 m-1  responseQuestInput"/>
                    <input type="text" className="col-2 m-1  responseQuestInput"/>
                    <input type="text" className="col-2 m-1  responseQuestInput"/>
                  </div>
                  <div className="rightResponse-container">
                    Resposta Correta: <input type="text" className="col-2 m-1  responseQuestInput" placeholder="Ex: 1"/>
                  </div>
                </section> 
                <hr />
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={createNewQuizz}>Criar Quiz</button>
          </>
        )}
       
      </section>
      
    </main>
  )
}
