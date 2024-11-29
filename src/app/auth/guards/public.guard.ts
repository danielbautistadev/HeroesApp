import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate {

    constructor( private authService: AuthService, private router: Router ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.authService.checkAuthentication().pipe(
            
            tap( isAuthenticated => {
                console.log('Authenticated: ', isAuthenticated);
            }),
            map( isAuthenticated => {
                if( isAuthenticated ) {
                    // Si el usuario está autenticado, no puede entrar a la ruta de login, registro, etc
                    this.router.navigateByUrl('/heroes/list');
                    return false;
                } 
                // Si el usuario no está autenticado, puede entrar a la ruta de login, registro, etc
                return true;
            })
            
        );
    }
    
}

