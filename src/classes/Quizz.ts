import { Question, QuizzInterface } from "@/interfaces/interfaces";

export default class Quizz implements QuizzInterface{
  constructor(public title:string,public category:string,public description:string,public questions:Question[],public createdBy:string,public time:number,public id?:number){}
}