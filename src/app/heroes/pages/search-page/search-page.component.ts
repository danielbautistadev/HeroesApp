import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public selectedHero?: Hero; // 1. Esta propiedad se utiliza para almacenar el superhéroe seleccionado en el componente. El signo de interrogación indica que la propiedad puede ser nula o indefinida.
  public searchInput = new FormControl(''); // 2. Esta propiedad se utiliza para crear un control de formulario para el campo de búsqueda. El valor inicial del control se establece en una cadena vacía.
  public heroes: Hero[] = [];// 3. Esta propiedad se utiliza para almacenar la lista de superhéroes que coinciden con el valor de búsqueda. La lista se utiliza para mostrar las sugerencias de búsqueda en la vista.

  constructor( private heroesService: HeroesService ) { }

  searchHero() { 
    const value: string = this.searchInput.value || '';

    // console.log({ value });

    this.heroesService.getSuggetions( value )
     .subscribe( heroes => this.heroes = heroes );
    // Explicación
    // 1. Se obtiene el valor del control de formulario "searchInput" y se asigna a la variable "value". Si el valor es nulo o indefinido, se asigna una cadena vacía para evitar errores en la búsqueda.
    // 2. Se llama al método "getSuggetions" del servicio "heroesService" pasando el valor de búsqueda como argumento. Este método devuelve un Observable que emite una lista de superhéroes que coinciden con el valor de búsqueda. La lista de superhéroes se asigna a la propiedad "heroes" del componente.
    // 3. El método "subscribe" se utiliza para suscribirse al Observable y recibir la lista de superhéroes emitida por él. Cuando se recibe la lista, se asigna a la propiedad "heroes" del componente para que pueda ser utilizada en la vista.
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void { 
    // console.log({event});
    // console.log(event.option!.value);
    if( !event.option!.value ) { 
      this.selectedHero = undefined;
      return;
      // 1. Se verifica si el valor de la opción seleccionada es nulo o indefinido. Si es así, se establece la propiedad "selectedHero" en "undefined" y se sale de la función para evitar errores en la aplicación.
    }

    const hero: Hero = event.option!.value;
    this.searchInput.setValue( hero.superhero! );

    this.selectedHero = hero;
    // Explicación:
    // 1. Cuando se selecciona una opción del autocomplete, se dispara el evento "optionSelected" y se ejecuta la función "onSelectedOption".
    // 2. En esta función, se obtiene el valor de la opción seleccionada y se asigna a la variable "hero".
    // 3. Luego, se asigna el valor del nombre del superhéroe a la propiedad "value" del control de formulario "searchInput". Esto actualiza el valor mostrado en el campo de búsqueda con el nombre del superhéroe seleccionado.
    // 4. Finalmente, se asigna el objeto "hero" a la propiedad "selectedHero" de la clase. Esto permite mostrar los detalles del superhéroe seleccionado en la interfaz de usuario.
  }

}
