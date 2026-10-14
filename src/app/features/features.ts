import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html'
})
export class Features {
  readonly caracteristicas = [
    { icono: '🔥', titulo: 'Tostado semanal', descripcion: 'Tostamos en pequeños lotes cada semana para que lo recibas fresco.' },
    { icono: '🌱', titulo: 'Origen único', descripcion: 'Granos seleccionados de fincas que conocemos por su nombre.' },
    { icono: '☕', titulo: 'Hecho al momento', descripcion: 'Cada bebida se prepara cuando la pides, sin prisas.' },
    { icono: '🛍️', titulo: 'Para llevar', descripcion: 'Lleva tus granos a casa, molidos a tu gusto.' },
  ];
}
