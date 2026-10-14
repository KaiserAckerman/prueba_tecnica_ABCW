import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html'
})
export class Testimonials {
  readonly testimonios = [
    { cita: 'El mejor flat white que he probado en la ciudad. Se nota que el café está recién tostado.', nombre: 'Camila R.', detalle: 'Clienta frecuente' },
    { cita: 'Compro los granos cada semana. El aroma cuando abres la bolsa lo dice todo.', nombre: 'Andrés M.', detalle: 'Cliente desde 2023' },
    { cita: 'Un lugar tranquilo para trabajar y un café que siempre sale perfecto.', nombre: 'Valeria S.', detalle: 'Trabaja desde aquí' },
  ];
}
