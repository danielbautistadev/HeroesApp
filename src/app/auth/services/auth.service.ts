import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl: string = environment.baseURL;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser(): User | undefined { 
        // Si no existe el usuario, regresa undefined
        if( !this.user ) return undefined;
        // Si existe el usuario, regresa una copia del usuario
        return structuredClone( this.user );
        // structuredClone: crea una copia del objeto para que no se pueda modificar desde fuera de la clase

    }

    login( email: string, password: string ):Observable<User> {
        
        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe(
                tap( user => this.user = user ),
                tap( user => localStorage.setItem( 'token', 'asdasdsa.545dsdasd.521dwds' ) )
            )

    }

    checkAuthentication(): Observable<boolean> { 
        
        if( !localStorage.getItem('token') ) return of(false); // Si no existe el token, regresa false

        const token = localStorage.getItem('token'); // Si existe el token, lo guarda en una constante llamada 'token'

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe(
                tap( user => this.user = user ), // Este 'tap' es para guardar el usuario en el servicio
                map( user => !!user ), // Este 'map' es para regresar un booleano, si existe el usuario regresa true, si no existe regresa false, el '!!' es para forzar la conversión a booleano.
                catchError( err => of(false) ) // Este 'catchError' es para regresar un observable de false en caso de que haya un error en la petición
            );

    }
    // El método 'checkAuthentication' se utiliza para verificar si el usuario está autenticado o no, si el usuario está autenticado, regresa un observable de true, si no está autenticado, regresa un observable de false, si hay un error en la petición, regresa un observable de false

    logout() {
        this.user = undefined;
        localStorage.clear();
    }

    
}