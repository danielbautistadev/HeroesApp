import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {


  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{ nonNullable: true }), // Esta propiedad representa el campo "superhero" del formulario. El valor inicial del campo es una cadena vacía (''). El segundo argumento es un objeto de configuración que establece la propiedad "nonNullable" en true. Esto significa que el valor del campo no puede ser nulo. Si se intenta establecer el valor del campo en nulo, Angular generará un error en tiempo de compilación.
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl('')
  });

  // Aquí estamos declarando un propiedad pública llamado "heroForm" que es una instancia de FormGroup. Esta instancia se inicializa con varios FormControl, cada uno representando un campo del formulario. Cada FormControl se inicializa con un valor vacío ('').

  // Los Formularios Reactivos son una característica de Angular que permite crear formularios dinámicos y reactivos. Esto significa que los valores y la validación de los campos del formulario se actualizan automáticamente a medida que el usuario interactúa con el formulario. Esto proporciona una experiencia de usuario más fluida y permite realizar validaciones en tiempo real.

  // Las propiedades dentro un FormGroup tienen tipos genéricos que especifican el tipo de datos que se espera para cada campo. Por ejemplo, el campo "id" se espera que sea una cadena (string), mientras que el campo "superhero" se espera que sea una cadena no nula (non-nullable string). Esto ayuda a garantizar la consistencia y la seguridad de los datos en el formulario.

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  constructor( 
    private heroesService: HeroesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog ) { }

  
  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return; // Si la URL no incluye la palabra "edit", la función se detiene y no se ejecuta el resto del código. Esto ayuda a evitar que se intente cargar un héroe inexistente o no válido en el formulario cuando se está creando un nuevo héroe.

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ) // El operador "switchMap" se utiliza para cambiar automáticamente a una nueva observable cuando cambia el valor de la observable anterior. En este caso, se utiliza para obtener los datos del héroe correspondiente al ID proporcionado en la URL. El método "getHeroById" del servicio "heroesService" se llama con el ID como argumento y devuelve una observable que emite los datos del héroe correspondiente. Estos datos se utilizan para inicializar los valores del formulario y mostrar la información del héroe al usuario.

      ).subscribe( hero => {
         if ( !hero ) return this.router.navigateByUrl('/'); // Si no se encuentra un héroe con el ID proporcionado, la función navega al usuario de vuelta a la página principal. Esto ayuda a evitar que se muestre un formulario vacío o con datos incorrectos al usuario.

         // this.heroForm.setValue(); // El método "setValue" se utiliza para establecer los valores de todos los campos del formulario a la vez. En este caso, se utiliza para inicializar los valores del formulario con los datos del héroe obtenidos de la observable. Esto permite que el usuario vea y edite la información del héroe en el formulario.

          this.heroForm.reset( hero ); // El método "reset" se utiliza para restablecer los valores de todos los campos del formulario a sus valores iniciales. En este caso, se utiliza para inicializar los valores del formulario con los datos del héroe obtenidos de la observable. El segundo argumento de la función "reset" es un objeto que contiene los valores iniciales de los campos del formulario. Esto permite que el usuario vea y edite la información del héroe en el formulario sin tener que volver a escribir todos los datos desde cero.

          // La diferencia principal entre setValue y reset es que setValue requiere que se proporcionen valores para todos los campos del formulario, mientras que reset solo requiere que se proporcionen valores para los campos que se desean restablecer. Además, reset restablece los valores de los campos a sus valores iniciales, mientras que setValue establece los valores de los campos a los valores proporcionados, incluso si estos valores no son válidos o no cumplen con las restricciones de validación del formulario.

          return;
      });

  }

  

  get currentHero(): Hero { 
     const hero = this.heroForm.value as Hero; // Obtiene el valor actual del formulario y lo asigna a la variable "hero" como un objeto de tipo "Hero". La palabra clave "as" se utiliza para realizar una aserción de tipo, lo que significa que estamos indicando a TypeScript que confíe en nosotros y que el valor de "heroForm.value" es de tipo "Hero". Esto nos permite acceder a las propiedades y métodos de la interfaz "Hero" en el resto del código sin tener que realizar comprobaciones de tipo adicionales.
     return hero;
  }

  public onSubmit() {

    if ( this.heroForm.invalid ) return; // Si el formulario no es válido, la función se detiene y no se ejecuta el resto del código. Esto ayuda a garantizar que los datos enviados al servidor sean válidos y completos.

    // this.heroesService.apdateHero( this.heroForm.value ); // Si el formulario es válido, se llama al método "apdateHero" del servicio "heroesService" y se le pasa el valor del formulario como argumento. Este método se encarga de enviar los datos del formulario al servidor para actualizar la información del héroe correspondiente.


    if( this.currentHero.id ) {
       this.heroesService.apdateHero( this.currentHero )
        .subscribe( hero => {
          // TODO mostrar snackbar

          this.showSnackbar(`${ hero.superhero } updated!`); // El método "showSnackbar" se utiliza para mostrar un mensaje de confirmación al usuario después de que se ha actualizado la información del héroe. El mensaje muestra el nombre del superhéroe actualizado y la palabra "updated!" para indicar que la operación se ha completado con éxito. El método "subscribe" se utiliza para manejar la respuesta del servidor y mostrar el mensaje de confirmación solo si la operación se ha completado con éxito. Si ocurre algún error durante la operación, el mensaje de error correspondiente se mostrará en su lugar.

        } ); // Si el héroe ya existe en la base de datos (es decir, si tiene un ID), se llama al método "apdateHero" del servicio "heroesService" para actualizar la información del héroe existente. Si el héroe no existe en la base de datos (es decir, si no tiene un ID), se llama al método "addHero" para agregar un nuevo héroe a la base de datos.

        return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO mostrar snackbar y navegar a /heroes/edit/hero.id

         this.router.navigate(['/heroes/edit', hero.id]); // Si la operación de agregar un nuevo héroe se ha completado con éxito, el método "navigate" del enrutador se utiliza para navegar a la página de edición del héroe recién creado. El ID del héroe se pasa como un parámetro de ruta para que la página de edición pueda obtener la información del héroe correspondiente de la base de datos y mostrarla en el formulario. Esto permite al usuario continuar editando la información del héroe si es necesario.

          this.showSnackbar(`${ hero.superhero } created!`); // El método "showSnackbar" se utiliza para mostrar un mensaje de confirmación al usuario después de que se ha agregado un nuevo héroe a la base de datos. El mensaje muestra el nombre del superhéroe creado y la palabra "created!" para indicar que la operación se ha completado con éxito. El método "subscribe" se utiliza para manejar la respuesta del servidor y mostrar el mensaje de confirmación solo si la operación se ha completado con éxito. Si ocurre algún error durante la operación, el mensaje de error correspondiente se mostrará en su lugar

      } ); // Si el héroe no existe en la base de datos (es decir, si no tiene un ID), se llama al método "addHero" del servicio "heroesService" para agregar un nuevo héroe a la base de datos. La respuesta del servidor se maneja en una función de devolución de llamada (callback) que muestra un snackbar y navega a la página de edición del héroe recién creado.

    // console.log({
      // formIsValid: this.heroForm.valid,
      // value: this.heroForm.getRawValue()
      // value: this.heroForm.value
      // La diferencia principal entre getRawValue() y value es que getRawValue() devuelve los valores de los campos del formulario tal como están en el momento actual, incluso si el formulario no es válido. Por otro lado, value solo devuelve los valores de los campos del formulario si el formulario es válido. Si el formulario no es válido, value devuelve null.
    // });

  }

  onDeleteHero() {
    if(  !this.currentHero.id ) throw Error('Hero id is required'); // Si el héroe no tiene un ID, se lanza un error con el mensaje "Hero id is required". Esto ayuda a garantizar que la operación de eliminación solo se realice en héroes existentes en la base de datos. Si se intenta eliminar un héroe que no existe, la operación fallará y se mostrará un mensaje de error en su lugar.

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value, // Se pasa el valor del formulario actual como un parámetro al componente de diálogo de confirmación. Esto permite al componente de diálogo mostrar la información del héroe que se va a eliminar y solicitar al usuario que confirme la operación. Si el usuario confirma la operación, el componente de diálogo devuelve un valor verdadero, lo que indica que la operación de eliminación debe continuar. Si el usuario cancela la operación, el componente de diálogo devuelve un valor falso, lo que indica que la operación de eliminación debe cancelarse.

    });


    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ), // El operador "filter" se utiliza para filtrar los valores emitidos por el observable "afterClosed" del componente de diálogo. En este caso, el operador "filter" solo permite que los valores verdaderos pasen a través de la secuencia de datos. Esto significa que si el usuario cancela la operación de eliminación o cierra el diálogo sin confirmar la operación, el operador "filter" descartará el valor emitido y no se ejecutará ninguna acción adicional. Si el usuario confirma la operación, el operador "filter" permitirá que el valor verdadero pase a través de la secuencia de datos y se ejecutará la acción de eliminación correspondiente.
      switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id ) ), 
      // tap( wasDelected => console.log( { 'wasDeleted': wasDelected }) )
      filter( (wasDelected: boolean) => wasDelected),
      // tap( result => console.log('tap', result)), // El operador "tap" se utiliza para realizar una acción secundaria en la secuencia de datos sin modificar los datos en sí. En este caso, se utiliza para registrar el resultado de la operación de diálogo en la consola del navegador. Esto puede ser útil para depurar y solucionar problemas si es necesario. Si el usuario confirma la operación, el resultado será verdadero. Si el usuario cancela la operación, el resultado será falso. Si el usuario cierra el diálogo sin confirmar o cancelar la operación, el resultado será undefined.

    )  
    .subscribe( () => {
        // console.log({ result}); // Se registra el resultado de la operación de diálogo en la consola del navegador. Esto puede ser útil para depurar y solucionar problemas si es necesario. Si el usuario confirma la operación, el resultado será verdadero. Si el usuario cancela la operación, el resultado será falso. Si el usuario cierra el diálogo sin confirmar o cancelar la operación, el resultado será undefined.
        this.router.navigate(['/heroes']);
    });

    // dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log({ result }); // El método "afterClosed()" se utiliza para obtener el resultado de la interacción del usuario con el cuadro de diálogo de confirmación. El resultado se maneja en una función de devolución de llamada (callback) que se ejecuta cuando el cuadro de diálogo se cierra. En este caso, el resultado se registra en la consola para fines de depuración. Sin embargo, en una aplicación real, se utilizaría el resultado para determinar si se debe continuar con la operación de eliminación o no. Si el usuario hace clic en el botón "Yes" del cuadro de diálogo, el resultado será true, y la operación de eliminación se llevará a cabo. Si el usuario hace clic en el botón "No" del cuadro de diálogo, el resultado será false, y la operación de eliminación se cancelará.

       // if ( !result ) return; // Si el resultado es falso, se detiene la ejecución de la función de devolución de llamada y no se realiza ninguna acción adicional. Esto permite cancelar la operación de eliminación si el usuario no confirma la operación en el cuadro de diálogo de confirmación. Si el resultado es verdadero, se continúa con la ejecución de la función de devolución de llamada y se realiza la operación de eliminación.
      //  console.log('Deleting...');

       //this.heroesService.deleteHeroById( this.currentHero.id )
        //.subscribe( wasDelected => {

          // if( wasDelected ) {

              // this.router.navigate(['/heroes']); // Si la operación de eliminación se realiza con éxito, el usuario se redirige a la página de lista de héroes utilizando el enrutador de Angular. Esto permite al usuario ver la lista actualizada de héroes sin el héroe eliminado. Si ocurre algún error durante la operación de eliminación, el usuario permanece en la página actual y se muestra un mensaje de error en su lugar.

          // }

        // } );

        /* El método "deleteHeroById" del servicio "heroesService" se utiliza para eliminar un héroe existente de la base de datos. El ID del héroe se pasa como un parámetro al método. El método devuelve un Observable que emite un valor booleano que indica si la operación de eliminación se ha completado con éxito o no. */

      // if (result !== undefined) {
      //   console.log({ result });
      // }
    // });

  }

  public showSnackbar( message: string ): void {
     this.snackbar.open( message, 'done', { duration: 2500 } ); // La función "showSnackbar" se utiliza para mostrar un snackbar en la pantalla con un mensaje específico. El primer argumento de la función "open" es el mensaje que se mostrará en el snackbar, el segundo argumento es el texto del botón que se mostrará en el snackbar, y el tercer argumento es un objeto de configuración que especifica la duración del snackbar en milisegundos.
  }

}
