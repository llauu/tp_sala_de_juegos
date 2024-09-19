import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrlImage = 'https://api.pexels.com/v1/search';
  private apiKeyImage = environment.pexel_API_KEY; 
  private apiKey = environment.quiz_API_KEY; 

  constructor(private http: HttpClient) {}

  getImage(query: string, perPage: number = 5): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.apiKeyImage
    });

    const params = {
      query: query,
      per_page: perPage.toString(),
      // per_page: perPage.toString(),
      page: 0,
      orientation: 'landscape',
      locale: 'es-ES'
    };
    
    return this.http.get<any>(this.apiUrlImage, { headers: headers, params: params });
  }

  getQuestions(category: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.apiKey
    });

    // return this.http.get<any>(`${this.apiUrlQuestion}&category=${category}&difficulty=${difficulty}`);
    return this.http.get<any>(`https://api.quiz-contest.xyz/questions?limit=5&page=1&category=${category}&format=multiple`, { headers: headers });
  }
}
