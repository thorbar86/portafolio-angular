import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;

  productos: Producto[] = [];

  productosFiltrados: Producto [] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();
  }

  private cargarProductos() {


    return new Promise ( ( resolve, reject) => {

    this.http.get('https://angular-html-cb07e.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });

    });

  }
  getProducto( id: string ) {
    return this.http.get(`https://angular-html-cb07e.firebaseio.com/productos/${ id }.json`);

  }
  


  buscarProducto ( termino: string ) {
  

    if (this.productos.length == 0 ) {
       /* cargamos productos*/
      this.cargarProductos().then( ()=> {
      /*ejecucatmos despues de tner productos */

      this.filtrarProductos ( termino );
      });
    }else {

      this.filtrarProductos ( termino );

      
    }
       }



    private filtrarProductos( termino: string) {

      this.productosFiltrados = [];

      termino = termino.toLocaleLowerCase();
  
      this.productos.forEach( prod => {
        
        const tituloLower = prod.titulo.toLocaleLowerCase();

        if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf ( termino ) >= 0 ) {

          this.productosFiltrados.push( prod );
        }
      });
    }
}
