import IApi from './IApi';
import ApiQuiz from "./entities/ApiQuiz";
import ApiQuizCreateRequest from "./entities/ApiQuizCreateRequest";
import ApiQuestion from "./entities/ApiQuestion";
import ApiUserQuizResult from "./entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "./entities/ApiUserQuizAnswer";
import {quizQuestions, quizzes, userQuizAnswers, userQuizResults} from "./mockData";

export default class Api implements IApi {
  private sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  public async getQuiz(id: number): Promise<ApiQuiz> {
    return this.sleep(300).then(() => quizzes.filter(quiz => quiz.id === id)[0]);
  }

  public async getAllQuizzes(): Promise<ApiQuiz[]> {
    return this.sleep(1000).then(() => quizzes);
  }

  public async getUserQuizzes(userId: number): Promise<ApiQuiz[]> {
    return this.sleep(1000).then(() => quizzes.filter(quiz => quiz.userId === userId));
  }

  public async createQuiz(data: ApiQuizCreateRequest): Promise<ApiQuiz> {
    const id = Math.floor(Math.random() * 10000) + 1;
    const quiz = {
      ...data,
      id,
      questionsQuantity: 0,
      time: 0
    };

    return this.sleep(500).then(() => quiz);
  }

  public async updateQuiz(id: number, data: ApiQuiz): Promise<ApiQuiz> {
    return this.sleep(500).then(() => data);
  }

  public async deleteQuiz(id: number): Promise<null> {
    return this.sleep(200).then(() => null);
  }

  public async getQuizQuestions(quizId: number): Promise<ApiQuestion[]> {
    return this.sleep(1000).then(() => quizQuestions);
  }

  public async editQuizQuestions(questions: ApiQuestion[]): Promise<ApiQuestion[]> {
    return this.sleep(500).then(() => questions);
  }

  public async getUserResults(userId: number): Promise<ApiUserQuizResult[]> {
    return this.sleep(1000).then(() => userQuizResults);
  }

  public async getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult> {
    return this.sleep(1000).then(() => userQuizResults.filter((result) => result.userId === userId && result.quizId === quizId)[0]);
  }

  public async getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]> {
    return this.sleep(1000).then(() => userQuizAnswers);
  }
}
