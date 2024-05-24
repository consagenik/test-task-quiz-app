import ApiAnswer from "./ApiAnswer";

type ApiQuestionType = 'selectOne' | 'selectMany' | 'text'

export default interface ApiQuestion {
  id: number
  quizId: number
  name: string
  type: ApiQuestionType
  answers?: ApiAnswer[]
}


// value: string | number | number[] | undefined
// text - string, selectOne - number, selectMany - number[], default - undefined
