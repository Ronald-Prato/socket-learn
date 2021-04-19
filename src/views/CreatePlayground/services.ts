import { db } from '../../firebase'
import { IQuestion } from './models'

export const createQuestion = async (newQuestion: IQuestion) => {
  return await db.collection('questions').doc().set(newQuestion)
}
