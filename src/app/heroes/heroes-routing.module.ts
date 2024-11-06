import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

// localhost:4200/heroes/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-hero',
        component: NewPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'edit/:id',
        component: NewPageComponent // Se puede crear un componente personalizado para la edición si es necesario
      },
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: ':id',
        component: HeroPageComponent
        // Nota Importante: Si colocamos este path al principio del arreglo, no funcionaria *«new-hero»* porque el path «:id» lo tomaría como un id válido. Por lo tanto, es importante colocar las rutas más específicas primero y las más genéricas al final.
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];
// Explicación: 
// 1. Declaramos una constante llamada "routes" que contiene un arreglo de objetos de tipo "Routes". Cada objeto representa una ruta y sus propiedades definen cómo se manejará esa ruta. En este caso, tenemos una ruta principal que no tiene un path especificado ('') y una ruta secundaria ('new-hero') que se carga dentro del componente "LayoutPageComponent". Cuando la ruta es '/heroes/new-hero', se mostrará el componente "NewPageComponent" dentro del "LayoutPageComponent".

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
