import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNewestStories(page: number, pageSize: number = environment.defaultPageSize): Observable<Story[]> {
    return this.http.get<Story[]>(
      `${this.apiUrl}/stories?page=${page}&pageSize=${pageSize}`
    );
  }

  searchStories(term: string, page: number, pageSize: number = environment.defaultPageSize): Observable<Story[]> {
    return this.http.get<Story[]>(
      `${this.apiUrl}/stories/search?term=${term}&page=${page}&pageSize=${pageSize}`
    );
  }
}