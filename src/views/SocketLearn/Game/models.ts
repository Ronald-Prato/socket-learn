type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface IAPIQuestion {
  category: string
  type: string
  difficulty: QuestionDifficulty
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
