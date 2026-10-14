import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Bebida {
  id: number | string;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
}

const API_URL = 'https://api.sampleapis.com/coffee/hot';
const RESPALDO_URL = 'menu-respaldo.json';
const MAX_BEBIDAS = 8;
// Esta foto ya se usa en el hero, no la repetimos en el menú.
const FOTO_DEL_HERO = 'photo-1561882468-9110e03e0f78';

// La API es pública y editable: dejamos solo los registros con forma correcta.
function esBebidaValida(x: any): x is Bebida {
  return (
    typeof x?.title === 'string' && x.title.trim() !== '' &&
    !x.title.toLowerCase().includes('test') &&
    typeof x.description === 'string' && x.description.trim() !== '' &&
    Array.isArray(x.ingredients) &&
    typeof x.image === 'string' && x.image.trim() !== '' &&
    !x.image.includes(FOTO_DEL_HERO)
  );
}

// Las URLs de Unsplash piden la foto a 1887 px de ancho; para una tarjeta basta con 600.
function reducirImagen(url: string): string {
  return url.replace(/([?&])w=\d+/, '$1w=600');
}

function limpiar(datos: unknown): Bebida[] {
  if (!Array.isArray(datos)) {
    return [];
  }
  return datos
    .filter(esBebidaValida)
    .slice(0, MAX_BEBIDAS)
    .map((bebida) => ({ ...bebida, image: reducirImagen(bebida.image) }));
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);

  obtenerBebidas(): Observable<Bebida[]> {
    return this.http.get<unknown>(API_URL).pipe(map(limpiar));
  }

  obtenerRespaldo(): Observable<Bebida[]> {
    return this.http.get<unknown>(RESPALDO_URL).pipe(map(limpiar));
  }
}
