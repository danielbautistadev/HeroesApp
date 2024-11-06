import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

// localhost:4200/auth/
const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'new-account',
                component: RegisterPageComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
];
// Explicación: 
// 1. Importamos los módulos necesarios: NgModule, RouterModule y Routes de '@angular/router'. También importamos el componente LayoutPageComponent que será utilizado en la ruta principal de nuestro módulo de autenticación.
// 2. Definimos las rutas para nuestro módulo de autenticación. En este caso, tenemos una sola ruta que es la ruta principal ('') y que carga el componente LayoutPageComponent. Este componente probablemente contiene la lógica y la estructura común para todas las páginas de autenticación de nuestra aplicación.
// 3. Creamos un módulo de enrutamiento para la autenticación (AuthRoutingModule) utilizando el decorador @NgModule. En este módulo, importamos RouterModule.forChild(routes) para configurar las rutas hijas de nuestro módulo de autenticación. También exportamos RouterModule para que pueda ser utilizado por otros módulos que importen AuthRoutingModule.
// 4. Finalmente, exportamos AuthRoutingModule para que pueda ser utilizado por otros módulos que necesiten acceder a las rutas de autenticación.


// Nota importante: 
// Entiendece que el componente LayoutPageComponent es un componente contenedor que probablemente contiene la estructura común para todas las páginas de autenticación de nuestra aplicación. Las rutas hijas definidas dentro de la ruta principal ('') se cargarán dentro de este componente contenedor.

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
