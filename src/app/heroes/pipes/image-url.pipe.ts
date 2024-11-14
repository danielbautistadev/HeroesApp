import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string = ''): string {
    const url = `/heroes/${value}.jpg`;

    return this.UrlExists(url) ? url : '/no-image.png';
  }

  private UrlExists(url: string): boolean { 
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if(http.status != 404)
      return true;
    else 
      return false;
  }

}
