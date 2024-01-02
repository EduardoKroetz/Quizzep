//src/app/classes/User.ts

import { QuizzInterface} from "../interfaces/interfaces";
import { UserInterface } from "../interfaces/interfaces";

export class User implements UserInterface{
  constructor(public name:string,public email:string, public password:string,public quizzes:QuizzInterface[],public id:string = ''){}
}




