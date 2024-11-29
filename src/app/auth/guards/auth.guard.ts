import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

    constructor( private authService: AuthService, private router: Router ) { }


    private checkAuthStatus(): boolean | Observable<boolean>{
        return this.authService.checkAuthentication()
            .pipe(
                tap( isAuthenticated => { console.log( { 'Authenticated': isAuthenticated } ) } ),

                tap( isAuthenticated => {
                    if( !isAuthenticated ) this.router.navigate(['./auth/login']);
                } )

            )

    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        // console.log('Can Match');
        // console.log({ route, segments });

        return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        // console.log('Can Activate');
        // console.log({ route, state });

         return this.checkAuthStatus();
    }
    
}

// 1. El método `canMatch` se llama antes de que se cargue un módulo asociado con una ruta. Este método recibe la ruta y los segmentos de la URL como argumentos. En este caso, simplemente imprime un mensaje en la consola y devuelve `false`, lo que significa que el acceso a la ruta está restringido.
// 2. El método `canActivate` se llama antes de que se active una ruta. Este método recibe el objeto `ActivatedRouteSnapshot` y el objeto `RouterStateSnapshot` como argumentos. En este caso, simplemente imprime un mensaje en la consola y devuelve `true`, lo que significa que el acceso a la ruta está permitido.
// 3. El servicio `AuthGuard` se proporciona en el nivel raíz de la aplicación utilizando el decorador `@Injectable({providedIn: 'root'})`. Esto significa que se crea una única instancia del servicio que se puede inyectar en cualquier componente o servicio de la aplicación.
// Un Guard es una clase que implementa la interfaz `CanActivate` o `CanMatch` y se utiliza para proteger las rutas de la aplicación. Los Guards se pueden utilizar para verificar si un usuario está autenticado antes de permitir el acceso a una ruta, o para verificar si un usuario tiene los permisos necesarios para acceder a una ruta. En este caso, el servicio `AuthGuard` se utiliza para proteger las rutas de la aplicación y verificar si un usuario está autenticado antes de permitir el acceso a una ruta.
