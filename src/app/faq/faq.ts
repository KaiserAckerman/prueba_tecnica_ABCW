import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html'
})
export class Faq {
  readonly preguntas = [
    { pregunta: '¿Tuestan el café cada semana?', respuesta: 'Sí, tostamos en pequeños lotes cada semana para que tu café llegue fresco.' },
    { pregunta: '¿Puedo comprar los granos molidos?', respuesta: 'Claro. Dinos cómo lo preparas (prensa, filtro, espresso) y lo molemos a tu gusto.' },
    { pregunta: '¿Tienen opciones sin lácteos?', respuesta: 'Sí, preparamos las bebidas con leche de avena o de almendra si lo prefieres.' },
    { pregunta: '¿Hacen envíos?', respuesta: 'Por ahora no. Esta es una cafetería ficticia, así que solo atendemos en el local.' },
  ];

  // Guarda la posición de la pregunta abierta; null = todas cerradas.
  readonly abierta = signal<number | null>(null);

  alternar(posicion: number) {
    this.abierta.update((actual) => (actual === posicion ? null : posicion));
  }
}
