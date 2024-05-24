import ApiQuiz from "../../api/entities/ApiQuiz";
import ApiQuizCreateRequest from "../../api/entities/ApiQuizCreateRequest";
import ApiQuestion from "../../api/entities/ApiQuestion";
import ApiUserQuizResult from "../../api/entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "../../api/entities/ApiUserQuizAnswer";

export default interface IMiddleware {
  getQuiz(id: number): Promise<ApiQuiz>;
  getAllQuizzes(): Promise<ApiQuiz[]>;
  getUserQuizzes(userId: number): Promise<ApiQuiz[]>;
  createQuiz(quiz: ApiQuizCreateRequest): Promise<ApiQuiz>;
  updateQuiz(id: number, quiz: ApiQuiz): Promise<ApiQuiz>;
  deleteQuiz(id: number): Promise<null>;
  getQuizQuestions(quizId: number): Promise<ApiQuestion[]>;
  editQuizQuestions(questions: ApiQuestion[]): Promise<ApiQuestion[]>;
  getUserResults(userId: number): Promise<ApiUserQuizResult[]>;
  getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult>;
  getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]>;
}
