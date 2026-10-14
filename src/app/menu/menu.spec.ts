import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Menu } from './menu';

const bebida = {
  id: 1,
  title: 'Cappuccino',
  description: 'Espresso con leche',
  ingredients: ['Espresso', 'Leche'],
  image: 'https://ejemplo.com/1.jpg',
};

describe('Menu', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  it('muestra el skeleton mientras carga y las tarjetas al terminar', async () => {
    const fixture = TestBed.createComponent(Menu);
    const el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
    expect(el.querySelector('[aria-busy="true"]')).not.toBeNull();

    http.expectOne('https://api.sampleapis.com/coffee/hot').flush([bebida]);
    await fixture.whenStable();

    expect(el.querySelector('[aria-busy="true"]')).toBeNull();
    expect(el.textContent).toContain('Cappuccino');
  });

  it('usa el respaldo local si la API falla', async () => {
    const fixture = TestBed.createComponent(Menu);
    const el = fixture.nativeElement as HTMLElement;

    http.expectOne('https://api.sampleapis.com/coffee/hot').error(new ProgressEvent('error'));
    http.expectOne('menu-respaldo.json').flush([bebida]);
    await fixture.whenStable();

    expect(el.textContent).toContain('Cappuccino');
    expect(el.textContent).toContain('selección guardada');
  });

  it('muestra el error si fallan la API y el respaldo', async () => {
    const fixture = TestBed.createComponent(Menu);
    const el = fixture.nativeElement as HTMLElement;

    http.expectOne('https://api.sampleapis.com/coffee/hot').error(new ProgressEvent('error'));
    http.expectOne('menu-respaldo.json').error(new ProgressEvent('error'));
    await fixture.whenStable();

    expect(el.querySelector('[role="alert"]')).not.toBeNull();
    expect(el.textContent).toContain('Reintentar');
  });

  it('muestra el estado vacío si la API no trae bebidas válidas', async () => {
    const fixture = TestBed.createComponent(Menu);
    const el = fixture.nativeElement as HTMLElement;

    http.expectOne('https://api.sampleapis.com/coffee/hot').flush([{ title: 'test' }]);
    await fixture.whenStable();

    expect(el.textContent).toContain('no hay bebidas para mostrar');
  });
});
