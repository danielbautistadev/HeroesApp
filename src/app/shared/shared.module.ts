import { NgModule } from '@angular/core';
import { Error404pageComponent } from './pages/error404page/error404page.component';


@NgModule({
  declarations: [
    Error404pageComponent
  ],
  exports: [
    Error404pageComponent
  ]
  // Estoy exportando Error404pageComponent porque quiero que sea una ruta por defecto que voy ha tener en mi app.routing.module.ts
})
export class SharedModule { }
