import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {
  // 1. Creamos una propiedad pública para almacenar el héroe obtenido desde el servicio, el simbolo "?" indica que la propiedad puede ser nula
  public hero?: Hero;
  // 2. Inyectamos el servicio HeroesService, ActivatedRoute y Router en el constructor de la clase HeroPageComponent
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  // 3. Implementamos el método ngOnInit() para obtener el id del héroe de la ruta actual y luego obtener los detalles del héroe utilizando el servicio HeroesService
  ngOnInit(): void {
    // 4. Utilizamos el método params del objeto activatedRoute para obtener el id de la ruta actual. Luego, utilizamos el operador pipe() para encadenar una serie de operadores de RxJS. El operador switchMap() se utiliza para cambiar de un observable a otro, en este caso, para cambiar del observable params al observable que se devuelve al llamar al método getHeroById() del servicio HeroesService. Esto nos permite obtener los detalles del héroe de forma asíncrona y actualizar la propiedad hero de la clase HeroPageComponent con los detalles obtenidos. Si el héroe no existe, redirigimos al usuario a la página de lista de héroes utilizando el método navigate() del objeto router.
    this.activatedRoute.params
      .pipe(
        //delay(5000), // Agregamos un delay de 3 segundos para simular una carga asíncrona
        switchMap(({ id }) => this.heroesService.getHeroById(id))

      ).subscribe( hero => { 

        if( !hero ) return this.router.navigate(['/heroes/list']);
        // 5. Si el héroe existe, actualizamos la propiedad hero de la clase HeroPageComponent con los detalles obtenidos. También imprimimos los detalles del héroe en la consola para fines de depuración.
        this.hero = hero;
        console.log({hero});
        // 6. Finalmente, retornamos undefined para completar la suscripción al observable. Esto es necesario para evitar errores de memoria y para asegurarnos de que la suscripción se cancele cuando el componente se destruya.
        return;
       })
  }

  public goback(): void {
    this.router.navigateByUrl('heroes/list');
  }

}
