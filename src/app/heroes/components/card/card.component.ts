import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  @Input() 
  public hero!: Hero;
  // Nota: El signo de exclamación (!) se utiliza para indicar que la propiedad 'hero' se inicializará en algún momento antes de que se utilice. Esto evita errores de compilación en TypeScript.
  // Explicaión:
  // 1. La propiedad 'hero' se declara con el decorador '@Input()'. Esto indica que la propiedad puede recibir datos desde un componente padre. Los datos se pasan desde el componente padre al componente hijo a través de la propiedad 'hero'.

  ngOnInit(): void {
    if(!this.hero) throw new Error('Hero property is required');
  }

  // 2. El método 'ngOnInit()' se llama automáticamente cuando se inicializa el componente. En este caso, se verifica si la propiedad 'hero' tiene un valor. Si no tiene un valor, se lanza un error con el mensaje 'Hero property is required'. Esto garantiza que el componente reciba los datos necesarios antes de renderizarse.

}
