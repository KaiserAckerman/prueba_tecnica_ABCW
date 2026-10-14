import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

const valida = (id: number, title = `Bebida ${id}`) => ({
  id,
  title,
  description: 'Una bebida rica',
  ingredients: ['Café'],
  image: `https://ejemplo.com/${id}.jpg`,
});

describe('MenuService', () => {
  let servicio: MenuService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    servicio = TestBed.inject(MenuService);
    http = TestBed.inject(HttpTestingController);
  });

  it('descarta los registros basura de la API', () => {
    let resultado: unknown[] = [];
    servicio.obtenerBebidas().subscribe((b) => (resultado = b));

    http.expectOne('https://api.sampleapis.com/coffee/hot').flush([
      valida(1),
      { ...valida(2), image: '' },
      { ...valida(3), ingredients: 'leche y azúcar' },
      valida(4, 'test'),
      valida(5, 'Black CoffeeTest'),
      { title: 'string', description: 'string', ingredients: 'array', image: 'string', id: 'number' },
    ]);

    expect(resultado.length).toBe(1);
  });

  it('devuelve como máximo 8 bebidas y no repite la foto del hero', () => {
    let resultado: { id: number | string }[] = [];
    servicio.obtenerBebidas().subscribe((b) => (resultado = b));

    const hero = { ...valida(99), image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=1' };
    http.expectOne('https://api.sampleapis.com/coffee/hot').flush([hero, ...Array.from({ length: 12 }, (_, i) => valida(i + 1))]);

    expect(resultado.length).toBe(8);
    expect(resultado.some((b) => b.id === 99)).toBe(false);
  });
});
