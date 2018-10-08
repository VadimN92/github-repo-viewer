import { Injectable } from '@angular/core';
import {Language} from '../interfaces/Language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages: Array<Language> = [
    {value: 'python', label: 'Python'},
    {value: 'javascript', label: 'JavaScript'},
    {value: 'java', label: 'Java'},
    {value: 'c++', label: 'C++'},
    {value: 'assembly', label: 'Assembly'},
    {value: 'lua', label: 'Lua'}
  ];

  constructor() { }

  getLanguages(): Array<Language> {
    return this.languages;
  }
}
