"use client"


import { ChangeEvent, useState } from "react"
import styles from "./page.module.css"
import { Question } from "@/interfaces/interfaces"
import "./style.css"

export default function Quiz(){
  const [title,setTitle] = useState('')
  const [category,setCategory] = useState('')
  const [description,setDescription] = useState('')
  const [timeQuiz, setTimeQuiz] = useState(60)
  const [qtdQuests,setQtdQuests] = useState(2)
  const [renderQuestsState,setRenderQuestsState] = useState(false)
  const [questsArr,setQuestsArr] = useState([])
  
  function createNewQuizz(){
    for (let i=0;i<qtdQuests;i++){
      const questHtml: HTMLInputElement  | null= document.querySelector(`quest-${i} > input`) 
      const responses: NodeListOf<Element> | null = document.querySelectorAll(`quest-${i} > .responses-container > 'input[data-response]`) 
      if (questHtml && responses){
        const quest = questHtml.value
      }
    }
  }


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
      <form className={`${styles.createQuizForm} createQuizForm col-12 col-md-6`} >
        <section>
          <label htmlFor="title">Título</label>
          <input type="text" id="title"
          className="form-control"
          value={title}
          onChange={(ev)=> {setTitle(ev.target.value)
          setRenderQuestsState(false)}}/>
        </section>
        <section>
          <label htmlFor="category">Categoria</label>
          <input type="text" id="category"
          className="form-control"
          value={category}
          onChange={(ev)=> {setCategory(ev.target.value)
          setRenderQuestsState(false)}}/>
        </section>
        <section>
          <label htmlFor="description">Descrição</label> <br />
          <textarea value={description} id="description" className="form-control" cols={40} rows={5} onChange={(ev)=>{setDescription(ev.target.value)
          setRenderQuestsState(false)}}></textarea>
        </section>
        <section>
          <label htmlFor="timeQuiz">Tempo do Quiz(segundos)</label>
          <input type="number" id="timeQuiz"
          className="form-control"
          min={15}
          value={timeQuiz}
          onChange={(ev)=> {setTimeQuiz(+ev.target.value)
          setRenderQuestsState(false)}}/>
        </section>
        <section>
          <label htmlFor="qtdQuests">Quantidade de Perguntas</label>
          <input type="number" id="qtdQuests" min={2} max={20}
          className="form-control"
          value={qtdQuests}
          onChange={(ev)=>  validateQtdQuests(ev)}/>
        </section>
        <button type="button" onClick={()=> setRenderQuestsState(true)} className="btn btn-info">Carregar perguntas</button>
      </form>
      <section className={`${styles.showQuests} col-md-6 col-12`}>
        {renderQuestsState && (
          <>
            {Array.from({length: qtdQuests},(_,index) => (
              <>
                <section key={index} className={`quest-${index}`}>
                  <label htmlFor={`question-${index + 1}`}>Pergunta {index + 1}</label>
                  <input
                    type="text"
                    id={`question-${index + 1}`}
                    className="form-control"
                  />
                  Respostas(1,2,3,4)
                  <div className="row responses-container m-0 p-0">
                    <input type="text" data-response="1" className="col-2 m-1 responseQuestInput"/>
                    <input data-response="2" type="text" className="col-2 m-1  responseQuestInput"/>
                    <input type="text" data-response="3" className="col-2 m-1  responseQuestInput"/>
                    <input type="text" data-response="4" className="col-2 m-1  responseQuestInput"/>
                  </div>
                  <div>
                    Resposta Correta: <input type="text" className="col-2 m-1  responseQuestInput" placeholder="Ex: 1"/>
                  </div>
                </section> 
                <hr />
              </>
            ))}
            <button type="button" className="btn btn-success">Criar Quiz</button>
          </>
        )}
       
      </section>
      
    </main>
  )
}

/* export interface Quizz {
  id: string; 
  questions: Question[]; // Array de perguntas no quiz
  createdBy: string; // Nome do usuário que criou o quiz
}

export interface Question {
  id: string;
  text: string; 
  options: string[]; // Array de opções de resposta
  correctOption: number; // Índice da opção correta
} */