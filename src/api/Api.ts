import IApi from './IApi';
import ApiQuiz from "./entities/ApiQuiz";
import ApiQuizCreateRequest from "./entities/ApiQuizCreateRequest";
import ApiQuestion from "./entities/ApiQuestion";
import ApiUserQuizResult from "./entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "./entities/ApiUserQuizAnswer";
import {quizQuestions, quizzes, userQuizAnswers, userQuizResults} from "./mockData";

export default class Api implements IApi {
  private baseUrl: string = process.env.REACT_APP_API_HOST!;

  private async fetchData(path: string, requestOptions: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, { ...requestOptions });
      const statusCode = response.status;
      const data = await response.json();

      return {
        data,
        statusCode,
        error: statusCode !== 200 ? data.message : null,
        pagesNumber: statusCode === 200 ? data.total_pages : null
      };
    } catch (e) {
      throw new Error(`API Fetch error: ${e}`);
    }
  }

  private async getData(path: string): Promise<any> {
    const myHeaders: { [key: string]: string } = {};

    const requestOptions: {
      method: string;
      redirect: 'follow' | 'error' | 'manual' | undefined;
      headers: { [key: string]: string };
    } = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    return this.fetchData(path, requestOptions);
  }

  private async postData(
    path: string,
    data: any,
  ): Promise<any> {
    const accessToken = localStorage.getItem('access_token');

    const myHeaders: { [key: string]: string } = {};
    if (accessToken) {
      myHeaders.Token = accessToken;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as string | Blob);
    }

    const requestOptions: {
      method: string;
      headers: { [key: string]: string };
      body: FormData;
    } = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
    };

    return this.fetchData(path, requestOptions);
  }

  private async putData(path: string, data: any): Promise<any> {
    const accessToken = localStorage.getItem('access_token');

    const myHeaders: { [key: string]: string } = {};
    if (accessToken) {
      myHeaders.Token = accessToken;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as string | Blob);
    }

    const requestOptions: {
      method: string;
      headers: { [key: string]: string };
      body: FormData;
    } = {
      method: 'PUT',
      headers: myHeaders,
      body: formData,
    };

    return this.fetchData(path, requestOptions);
  }

  private async deleteData(path: string): Promise<any> {
    const accessToken = localStorage.getItem('access_token');

    const myHeaders: { [key: string]: string } = {};
    if (accessToken) {
      myHeaders.Token = accessToken;
    }

    const requestOptions: {
      method: string;
      headers: { [key: string]: string };
    } = {
      method: 'DELETE',
      headers: myHeaders,
    };

    return this.fetchData(path, requestOptions);
  }

  private sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  public async getQuiz(id: number): Promise<ApiQuiz> {
    // return this.getData(`/quizzes/${id}`);
    return this.sleep(300).then(() => quizzes.filter(quiz => quiz.id === id)[0]);
  }

  public async getQuizzes(): Promise<ApiQuiz[]> {
    // return this.getData('/quizzes');
    return this.sleep(1000).then(() => quizzes);
  }

  public async createQuiz(data: ApiQuizCreateRequest): Promise<ApiQuiz> {
    // return this.postData('/quizzes', data);
    const id = Math.floor(Math.random() * 10000) + 1;
    const quiz = {
      ...data,
      id
    };

    return this.sleep(500).then(() => quiz);
  }

  public async updateQuiz(id: number, data: ApiQuiz): Promise<ApiQuiz> {
    // return this.putData(`/quizzes/${id}`, data);

    return this.sleep(500).then(() => data);
  }

  public async deleteQuiz(id: number): Promise<null> {
    // return this.deleteData(`/quizzes/${id}`);

    return this.sleep(200).then(() => null);
  }

  public async getQuizQuestions(quizId: number): Promise<ApiQuestion[]> {
    // return this.getData(`/quizzes/${quizId}/questions`);
    return this.sleep(1000).then(() => quizQuestions);
  }

  public async editQuizQuestions(questions: ApiQuestion[]): Promise<ApiQuestion[]> {
    // return this.putData(`/quizzes/questions`, questions);

    // TODO: update quiz questions
    return this.sleep(500).then(() => questions);
  }

  public async getUserResults(userId: number): Promise<ApiUserQuizResult[]> {
    // return this.getData(`/user/${userId}/results`);
    const response = this.sleep(1000).then(() => userQuizResults);

    // TODO: save user results
    return response;
  }

  public async getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult> {
    // return this.getData(`/user/${userId}/quiz/${quizId}/results`);
    const response = this.sleep(1000).then(() => userQuizResults.filter((result) => result.userId === userId && result.quizId === quizId)[0]);

    // TODO: save user results
    return response;
  }

  public async getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]> {
    // return this.getData(`/user/${userId}/quiz/${quizId}/answers`);
    const response = this.sleep(1000).then(() => userQuizAnswers);

    // TODO: save user results
    return response;
  }
}
