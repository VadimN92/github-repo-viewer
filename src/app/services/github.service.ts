import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getRepos({query = '', language = '', order = 'desc', page = 1, per_page = 10}) {
    return this.http
    .get(`https://api.github.com/search/repositories?q=${query}+language:${language}&order=${order}&page=${page}&per_page=${per_page}`);
  }
}
