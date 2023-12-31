import { Quizz} from "../interfaces/interfaces";
import { UserInterface } from "../interfaces/interfaces";

export class User implements UserInterface{
  constructor(public name:string,public email:string, public password:string,public quizzes:Quizz[],public id:string = ''){}

  addQuizz(newQuizz:Quizz) {
    this.quizzes.push(newQuizz)
  }

  removeQuizz(id:string){
    this.quizzes = this.quizzes.filter(quizz => quizz.id !== id);
  }


}




