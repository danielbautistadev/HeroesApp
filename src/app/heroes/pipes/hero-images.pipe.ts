import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImages'
})
export class HeroImagesPipe implements PipeTransform {

  transform(hero: Hero): string {
    
    if (!hero.id && !hero.alt_img) {
      return '/no-image.png';
    }

    if(hero.alt_img) return hero.alt_img; // http://localhost:4200/no-image.png

    return `/heroes/${hero.id}.jpg`;

  }

  // Explicación: 
  // 1. Importamos las interfaces y módulos necesarios para crear el pipe.
  // 2. Creamos la clase HeroImagesPipe y la decoramos con el decorador @Pipe, indicando el nombre del pipe como 'heroImages'.
  // 3. Implementamos la interfaz PipeTransform, que nos obliga a implementar el método transform().
  // 4. En el método transform(), recibimos un objeto de tipo Hero como parámetro. Este objeto representa a un héroe y contiene propiedades como id y alt_img.
  // 5. Comprobamos si el héroe no tiene un id ni una imagen alternativa (alt_img). Si es así, devolvemos la ruta de la imagen por defecto 'no-image.png'.
  // 6. Si el héroe tiene una imagen alternativa, devolvemos la ruta de esa imagen. Esto se utiliza para héroes cuyas imágenes están alojadas en un servidor externo y no en nuestro servidor local. Por ejemplo, 'https://www.example.com/heroes/dc-batman.jpg'.
  // 7. Si el héroe tiene un id pero no tiene una imagen alternativa, devolvemos la ruta de la imagen correspondiente en nuestro servidor local. Por ejemplo, '/heroes/dc-batman.jpg'.

}
