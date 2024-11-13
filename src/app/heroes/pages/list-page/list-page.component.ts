import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  // 1. Creamos una propiedad para almacenar los héroes obtenidos del servicio
  public heroes: Hero[] = [];

  // 1. Inyectamos el servicio en el constructor
  constructor(private heroesService: HeroesService) { }

  // 2. Usamos el servicio en el método ngOnInit para obtener los héroes
  ngOnInit(): void {
    // 3. Suscribimos al observable del servicio para obtener los héroes
    this.heroesService.getHeroes()
      // 4. Asignamos los héroes obtenidos a la propiedad heroes del componente
      .subscribe(heroes => this.heroes = heroes);
  }

}
