import { Component, inject, signal } from '@angular/core';
import { Bebida, MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html'
})
export class Menu {
  private readonly menuService = inject(MenuService);

  readonly bebidas = signal<Bebida[]>([]);
  readonly estado = signal<'cargando' | 'listo' | 'error'>('cargando');
  readonly usandoRespaldo = signal(false);

  readonly esqueleto = [1, 2, 3, 4, 5, 6, 7, 8];
  readonly sinImagen = 'images/sin-imagen.svg';

  // Por defecto la foto se centra (50%). Estas bebidas salen mal encuadradas en la tarjeta:
  // un % mayor muestra más de la parte baja de la foto (el producto sube), uno menor, más de la alta.
  private readonly posicionFoto: Record<string, string> = {
    '4': '70%', // Cappuccino
    '7': '100%', // Macchiato
    '8': '100%', // Mocha
    '10': '80%', // Chai Latte
    '11': '25%', // Matcha Latte
  };

  posicion(bebida: Bebida): string {
    return this.posicionFoto[String(bebida.id)] ?? '50%';
  }

  constructor() {
    this.cargar();
  }

  cargar() {
    this.estado.set('cargando');
    this.usandoRespaldo.set(false);

    this.menuService.obtenerBebidas().subscribe({
      next: (bebidas) => {
        this.bebidas.set(bebidas);
        this.estado.set('listo');
      },
      error: () => this.cargarRespaldo(),
    });
  }

  private cargarRespaldo() {
    this.menuService.obtenerRespaldo().subscribe({
      next: (bebidas) => {
        this.bebidas.set(bebidas);
        this.usandoRespaldo.set(true);
        this.estado.set('listo');
      },
      error: () => this.estado.set('error'),
    });
  }

  // Si una foto no carga, ponemos la imagen local (una sola vez, para no entrar en bucle).
  alFallarImagen(evento: Event) {
    const img = evento.target as HTMLImageElement;
    if (!img.src.endsWith(this.sinImagen)) {
      img.src = this.sinImagen;
    }
  }
}
