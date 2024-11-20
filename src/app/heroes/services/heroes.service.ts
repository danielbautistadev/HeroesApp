import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeroesService {

    // Creamos una proiedad privada para guardar la url base de la api
    private baseUrl: string = environment.baseURL;

    // Inyectamos el HttpClient en el constructor para poder usarlo en los métodos
    constructor(private http: HttpClient) { }

    // 1. Creamos un método para obtener todos los héroes de tipo Observable<Hero[]> que retoorne un array de héroes
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
        // Este método usa el método get de HttpClient para obtener todos los héroes de la api y los retorna como un array de héroes. El método get de HttpClient recibe como argumento la url de la api y el tipo de dato que esperamos recibir como respuesta, en este caso un array de héroes. El método get de HttpClient retorna un Observable que emite el array de héroes cuando la petición se complete con éxito.
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

    getSuggetions( query: string ): Observable<Hero[]> { 
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`);
        // En este método estamos usando el operador de consulta 'q' para buscar héroes que coincidan con el query y el operador _limit para limitar la cantidad de resultados a 6
    }

    addHero( hero: Hero ): Observable<Hero> { 
        return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
        // Este método usa el método post de HttpClient para agregar un nuevo héroe a la api. El método post de HttpClient recibe como argumentos la url de la api y el objeto que queremos agregar, en este caso un héroe. El método post de HttpClient retorna un Observable que emite el héroe agregado cuando la petición se complete con éxito.
    }

    apdateHero( hero: Hero ): Observable<Hero> { 
        // 1. Validamos que el héroe tenga un id para poder actualizarlo
        if( !hero.id ) throw Error('Hero id is required');
        // 2. Este método retorna un Observable que emite el héroe actualizado cuando la petición se complete con éxito. Usamos el método patch de HttpClient para actualizar el héroe en la api. El método patch de HttpClient recibe como argumentos la url de la api y el objeto que queremos actualizar, en este caso un héroe. El método patch de HttpClient retorna un Observable que emite el héroe actualizado cuando la petición se complete con éxito.
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id }`, hero);
    }

    deleteHeroById( id: string ): Observable<boolean> { 
        // 1. Retoornamos un Observable que emite un booleano indicando si la petición se completó con éxito o no. Usamos el método delete de HttpClient para eliminar el héroe de la api. El método delete de HttpClient recibe como argumento la url de la api. El método delete de HttpClient retorna un Observable que emite un booleano indicando si la petición se completó con éxito o no. Usamos el operador pipe para manejar el error si no lo encuentra y retornamos un observable de tipo boolean con el valor de false. Usamos el operador map para transformar la respuesta del servidor en un booleano indicando si la petición se completó con éxito o no.
        return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
           .pipe(
                map( resp => true ),
                catchError( err => of(false) )                
           )
    }

    // La diferencias entre patch y put es que patch actualiza solo los campos que se envían en el body de la petición, mientras que put actualiza todo el objeto. En este caso estamos usando patch porque solo queremos actualizar el nombre del héroe, no todo el objeto.

    // Nota: El operador map() es un operador de RxJS que se utiliza para transformar los valores emitidos por un Observable en otros valores. En este caso, estamos usando el operador map() para transformar la respuesta del servidor en un booleano indicando si la petición se completó con éxito o no.
    
}