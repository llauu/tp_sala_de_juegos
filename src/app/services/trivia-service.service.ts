import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrlQuestion = 'https://opentdb.com/api.php?amount=5&type=multiple';
  private apiUrlImage = 'https://api.pexels.com/v1/search';
  private apiKey = environment.pexel_API_KEY; 

  constructor(private http: HttpClient) {}

  getImage(query: string, perPage: number = 5): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.apiKey
    });

    const params = {
      query: query,
      per_page: perPage.toString(),
      // per_page: perPage.toString(),
      page: Math.floor(Math.random() * 100).toString(),
      orientation: 'landscape'
    };
    
    return this.http.get<any>(this.apiUrlImage, { headers: headers, params: params });
  }

  getQuestions(category: string, difficulty: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlQuestion}&category=${category}&difficulty=${difficulty}`);
  }
}
