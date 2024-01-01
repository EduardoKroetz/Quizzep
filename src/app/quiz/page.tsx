"use client"


import { ChangeEvent, useState } from "react"
import styles from "./page.module.css"
import { Question } from "@/interfaces/interfaces"


export default function Quiz(){
  const [title,setTitle] = useState('')
  const [category,setCategory] = useState('')
  const [description,setDescription] = useState('')
  const [timeQuiz, setTimeQuiz] = useState(60)
  const [qtdQuests,setQtdQuests] = useState(2)
  const [renderQuestsState,setRenderQuestsState] = useState(false)
  const [questsArr,setQuestsArr] = useState([])
  
  function saveQuestInArr(){
    let arrQuests : Question[] = []
    for(let i =0;i<qtdQuests;i++){
      const quest: HTMLInputElement | null = document.querySelector(`input #question-${i + 1}`)
      if (quest){
        arrQuests = [...arrQuests, quest]
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
          <input type="text" id="timeQuiz"
          className="form-control"
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
              <section key={index}>
                <label htmlFor={`question-${index + 1}`}>Pergunta {index + 1}</label>
                <input
                  type="text"
                  id={`question-${index + 1}`}
                  className="form-control"
                />
                <div className="row m-0 p-0">
                  <input type="text" className="col-3 responseQuestInput"/>
                  <input type="text" className="col-3 responseQuestInput"/>
                  <input type="text" className="col-3 responseQuestInput"/>
                  <input type="text" className="col-3 responseQuestInput"/>
                </div>
              </section>  
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