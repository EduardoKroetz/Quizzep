// src/components/QuizQuests.tsx

import { QuizzInterface } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

export default function QuizQuests( {quiz}: {quiz:QuizzInterface}){
  const [manageVisualization,setManageVisualization] = useState(0)
  const [pontuation,setPontuation] = useState(0)
  const [time,setTime] = useState<number>(()=> Number(quiz.time) || Number(quiz.time) < 15 ? Number(quiz.time) : 60)
  const [loss,setLoss] = useState(false)

  
  function selectedOption(selectedOptionNumber:number,correctOption:number){
    //Verifica a resposta selecionada, se for certa incrementa na pontuação;
    if (selectedOptionNumber === correctOption) {
      setPontuation((value)=> value+1)
    }

    //atualiza a visualizacao 
    setManageVisualization(value => value +1)
  }


  //Contador de tempo
  useEffect(() => {
    var intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setLoss(true);
          clearInterval(intervalId); // Limpar o intervalo quando o tempo expirar
          return 0;
        }
      });
    }, 1000);
    
    //se já tiver terminado o quiz para o contador
    if (manageVisualization === quiz.questions.length){
      clearInterval(intervalId)
    }
    

    return () => clearInterval(intervalId); // Limpar o intervalo ao desmontar o componente
  }, [manageVisualization,quiz.questions.length]);
  


 

  //Se o tempo acabar mostra essa mensagem
  if (loss === true){
    return (
      <section className="bg-danger section">
        <h3>Você perdeu!</h3>
        <p>Pontuação: {pontuation}/{quiz.questions.length}</p>
      </section>
    )
  }
  
  
  return (
    <>
      {manageVisualization === quiz.questions.length ? (
        <section className={`${pontuation === quiz.questions.length ? "bg-success" : "bg-warning"} section`}  >
          <h4>Acertos:</h4>
          <p>{pontuation}/{quiz.questions.length}</p>
        </section>
      ): 
        <>
          {quiz.questions.map((question,index)=> (
            <>
              {index === manageVisualization && (
                <section key={index} className="section">
                  <h5>{index+1} - {question.text}</h5>
                  <section className="row my-3">
                    {question.options.map((option,index)=>(
                      <button type="button"
                      className="btn btn-warning col-4 col-lg-2 m-2" 
                      onClick={()=> selectedOption(index+1,question.correctOption)}>{option}</button>
                    ))}
                  </section>
                  <section>                  
                    <progress value={time} max={Number(quiz.time)} style={{width:"100%"}}/>
                  </section>
                </section>
              )}
            </>
          ))}
        </>
      }

    </>
  )

  
}