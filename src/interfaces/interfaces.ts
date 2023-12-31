// Interface Quizz
export interface Quizz {
  id: string; 
  title: string; 
  category: string; // Categoria do quiz (ex: Matemática, Ciências, etc.)
  description: string;
  questions: Question[]; // Array de perguntas no quiz
  createdBy: string; // Nome do usuário que criou o quiz
}

// Interface Question
export interface Question {
  id: string;
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
  quizzes: Quizz[]; // Array de quizzes criados pelo usuário
}