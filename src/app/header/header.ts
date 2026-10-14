import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html'
})
export class Header {
  readonly enlaces = [
    { texto: 'Características', href: '#caracteristicas' },
    { texto: 'Menú', href: '#menu' },
    { texto: 'Testimonios', href: '#testimonios' },
    { texto: 'FAQ', href: '#faq' },
    { texto: 'Contacto', href: '#contacto' },
  ];

  readonly menuAbierto = signal(false);

  alternarMenu() {
    this.menuAbierto.update((abierto) => !abierto);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }
}
