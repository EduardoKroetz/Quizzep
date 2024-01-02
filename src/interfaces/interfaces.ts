// src/interfaces/interfaces.ts

// Interface Quizz
export interface QuizzInterface {
  id?: number; 
  title: string; 
  category: string; // Categoria do quiz (ex: Matemática, Ciências, etc.)
  description: string;
  questions: Question[]; // Array de perguntas no quiz
  createdBy: string; // Nome do usuário que criou o quiz
  time?:number
}

// Interface Question
export interface Question {
  text: string; 
  options: string[]; // Array de opções de resposta
  correctOption: number; // Índice da opção correta
}


// Interface User
export interface UserInterface {
  id?: string | undefined
  name: string;
  email: string; 
  password: string;
  quizzes: QuizzInterface[]; // Array de quizzes criados pelo usuário
}