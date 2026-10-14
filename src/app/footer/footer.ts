import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html'
})
export class Footer {
  readonly anio = new Date().getFullYear();

  readonly enlaces = [
    { texto: 'Características', href: '#caracteristicas' },
    { texto: 'Menú', href: '#menu' },
    { texto: 'Testimonios', href: '#testimonios' },
    { texto: 'Preguntas frecuentes', href: '#faq' },
    { texto: 'Contacto', href: '#contacto' },
  ];

  readonly suscrito = signal(false);

  // Las redes son ficticias: el clic no lleva a ningún lado.
  sinDestino(evento: Event) {
    evento.preventDefault();
  }

  // El navegador ya valida el correo (required + type="email") antes de lanzar este evento.
  // Envío simulado: no hay backend, solo mostramos el mensaje de éxito.
  suscribir(evento: Event) {
    evento.preventDefault();
    (evento.target as HTMLFormElement).reset();
    this.suscrito.set(true);
  }
}
