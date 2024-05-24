import ApiQuiz from "../../api/entities/ApiQuiz";
import {Api} from "../../api";
import ApiQuizCreateRequest from "../../api/entities/ApiQuizCreateRequest";
import ApiQuestion from "../../api/entities/ApiQuestion";
import ApiUserQuizResult from "../../api/entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "../../api/entities/ApiUserQuizAnswer";
import IMiddleware from "./IMiddleware";

export default class Middleware implements IMiddleware {
  public async getQuiz(id: number): Promise<ApiQuiz> {
    const data = localStorage.getItem('quiz_' + id);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getQuiz(id);
    localStorage.setItem('quiz_' + id, JSON.stringify(response));

    return response;
  }

  public async getAllQuizzes(): Promise<ApiQuiz[]> {
    const data = localStorage.getItem('quizzes');

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getAllQuizzes();
    localStorage.setItem('quizzes', JSON.stringify(response));

    return response;
  }

  public async getUserQuizzes(userId: number): Promise<ApiQuiz[]> {
    const data = localStorage.getItem('user_quizzes_' + userId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getUserQuizzes(userId);
    localStorage.setItem('user_quizzes_' + userId, JSON.stringify(response));

    return response;
  }

  public async createQuiz(quiz: ApiQuizCreateRequest): Promise<ApiQuiz> {
    const response = await Api.createQuiz(quiz);
    const quizzes = await this.getAllQuizzes();
    localStorage.setItem('quizzes', JSON.stringify([...quizzes, response]));
    return response;
  }

  public async updateQuiz(id: number, quiz: ApiQuiz): Promise<ApiQuiz> {
    const response = await Api.updateQuiz(id, quiz);
    const quizzes = await this.getAllQuizzes();
    localStorage.setItem('quizzes', JSON.stringify(quizzes.map((q) => q.id === id ? response : q)));
    return response;
  }

  public async deleteQuiz(id: number): Promise<null>  {
    const response = await Api.deleteQuiz(id);
    const quizzes = await this.getAllQuizzes();
    localStorage.setItem('quizzes', JSON.stringify(quizzes.filter((quiz) => quiz.id !== id)));
    return response;
  }

  public async getQuizQuestions(quizId: number): Promise<ApiQuestion[]> {
    const data = localStorage.getItem('quiz_questions_' + quizId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getQuizQuestions(quizId);
    localStorage.setItem('quiz_questions_' + quizId, JSON.stringify(response));

    return response;
  }

  public async editQuizQuestions(questions: ApiQuestion[]): Promise<ApiQuestion[]> {
    const response = await Api.editQuizQuestions(questions);
    localStorage.setItem('quiz_questions_' + questions[0].quizId, JSON.stringify(response));

    if (questions.length) {
      const relatedQuiz = await this.getQuiz(questions[0].quizId);
      const questionsQuantity = questions.length;
      const time = questions.reduce((time, question) => time + question.time, 0);
      const updatedQuiz = await this.updateQuiz(relatedQuiz.id,{...relatedQuiz, questionsQuantity, time});
      localStorage.setItem('quiz_' + updatedQuiz.id, JSON.stringify(updatedQuiz));
    }

    return response;
  }

  public async getUserResults(userId: number): Promise<ApiUserQuizResult[]> {
    const data = localStorage.getItem('user_results_' + userId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getUserResults(userId);
    localStorage.setItem('user_results_' + userId, JSON.stringify(response));

    return response;
  }

  public async getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult> {
    return this.getUserResults(userId).then((results) => results.filter((result) => result.quizId === quizId)[0]);
  }

  public async getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]> {
    const data = localStorage.getItem('user_answers_' + userId + '_' + quizId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getUserQuizAnswers(userId, quizId);
    localStorage.setItem('user_answers_' + userId + '_' + quizId, JSON.stringify(response));

    return response;
  }
}
