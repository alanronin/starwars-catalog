import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  getFilms() {
    return this.http.get(`${environment.apiUrl}/films/`);
  }

  getFimsByCharacter(api: string) {
    return this.http.get(`${api}`);
  }
}
