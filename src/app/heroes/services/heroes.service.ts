import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeroesService {

    // Creamos una proiedad privada para guardar la url base de la api
    private baseUrl: string = environment.baseURL;

    // Inyectamos el HttpClient en el constructor para poder usarlo en los métodos
    constructor(private http: HttpClient) { }

    // 1. Creamos un método para obtener todos los héroes de tipo Observable<Hero[]> que retoorne un array de héroes
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    // 2. Creamos un método para obtener un héroe por su id de tipo Observable<Hero | undefined> que retoorne un héroe o undefined si no lo encuentra
    getHeroById(id: string): Observable<Hero | undefined> {
        // 3. Usamos el método get de HttpClient para obtener el héroe por su id y usamos el operador pipe para manejar el error si no lo encuentra
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                // 4. Usamos el operador catchError para manejar el error si no lo encuentra y retornamos un observable de tipo Hero | undefined con el valor de undefined
                catchError(error => of(undefined))
                // Nota: of es un creador de observables en RxJS. Cuando usas of, genera un observable que emite los valores que le pasas como argumentos, en el orden en el que los proporcionas, y luego se completa. En este caso, estamos creando un observable que emite el valor undefined y luego se completa, lo que significa que cualquier suscriptor recibirá el valor undefined y luego la notificación de que el observable se ha completado.
            );
    }
    
}