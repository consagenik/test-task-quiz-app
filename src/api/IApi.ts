import ApiQuiz from "./entities/ApiQuiz";
import ApiUserQuizResult from "./entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "./entities/ApiUserQuizAnswer";
import ApiQuizCreateRequest from "./entities/ApiQuizCreateRequest";
import ApiQuestion from "./entities/ApiQuestion";

export default interface IApi {
  getQuiz(id: number): Promise<ApiQuiz>;
  getQuizzes(): Promise<ApiQuiz[]>;
  createQuiz(quiz: ApiQuizCreateRequest): Promise<ApiQuiz>;
  updateQuiz(id: number, quiz: ApiQuiz): Promise<ApiQuiz>;
  deleteQuiz(id: number): Promise<null>;
  getQuizQuestions(quizId: number): Promise<ApiQuestion[]>;
  editQuizQuestions(questions: ApiQuestion[]): Promise<ApiQuestion[]>;
  getUserResults(userId: number): Promise<ApiUserQuizResult[]>;
  getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult>;
  getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]>;
}
