// src/components/Search.tsx

import { useQuizzes } from "@/hooks/useQuizzes";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function Search(props: {searchIsOpen:boolean,setSearchIsOpen:Dispatch<SetStateAction<boolean>>,searchInput:string}){

  const { quizzes } = useQuizzes()
  const results = quizzes?.filter((quiz) => quiz.title.includes(props.searchInput))

  if (props.searchInput === ''){
    props.setSearchIsOpen(false)
  }


  if (props.searchIsOpen){
    return (
      <>
        <section className="searchContainer col-12 col-lg-6">
          {results?.length === 0 ? (
            <h4 className="m-auto">Nenhum resultado encontrado!</h4>
          ): (
            <table>
              {results?.map((result)=>(
                <tr>
                  <td>{result.title}</td>
                  <td><td><Link href={`../quizzes/${result.id}`} ><button type="button" className="btn btn-success">Jogar</button></Link></td></td>
                </tr>
              ))}    
            </table>
          )}
          <div onClick={()=> props.setSearchIsOpen(false)}>X</div>
      </section>
      </>
    )
  }
  
}