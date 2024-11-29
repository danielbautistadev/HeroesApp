import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Agregar', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' }
  ]

  constructor( private authService: AuthService, private router: Router ) { }

  get user(): User | undefined { 
    return this.authService.currentUser;
  }

  onLougout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }


  // Explicación: 
  // 1. Importamos el decorador Component desde '@angular/core'. Este decorador se utiliza para definir un componente en Angular. Un componente es una parte de la interfaz de usuario que tiene su propio código, plantilla y estilos. En este caso, estamos definiendo un componente llamado LayoutPageComponent.
  // 2. Utilizamos el decorador @Component para configurar el componente. Dentro de las llaves, proporcionamos un objeto de metadatos que describe el componente. En este caso, estamos configurando el selector, la plantilla y los estilos del componente. El selector es el nombre que se utiliza para insertar el componente en la plantilla HTML de otro componente. La plantilla es la ruta al archivo HTML que contiene la estructura del componente. Los estilos son los estilos CSS específicos del componente. En este caso, no estamos proporcionando ningún estilo, por lo que estamos dejando el campo de estilos vacío.
  // 3. Exportamos la clase LayoutPageComponent para que pueda ser utilizada en otros archivos. Esta clase es la clase del componente y contiene la lógica del componente. En este caso, la clase contiene una propiedad pública llamada sidebarItems que es un array de objetos. Cada objeto representa un elemento en la barra lateral del componente y contiene una etiqueta, un icono y una URL.

}
