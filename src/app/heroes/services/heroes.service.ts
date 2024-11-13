import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl: string = environment.baseURL;

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }
    
}