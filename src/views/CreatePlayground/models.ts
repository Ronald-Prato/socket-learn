export interface IFormOption {
  id: string
  name: string
  label: CorrectAnswer
}

export interface IQuestion {
  id: string
  createdBy: string
  question: string
  options: {
    a: string
    b: string
    c: string
    d: string
  }
  correct: CorrectAnswer
}

export type CorrectAnswer = 'a' | 'b' | 'c' | 'd'
