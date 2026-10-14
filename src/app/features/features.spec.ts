import { TestBed } from '@angular/core/testing';
import { Features } from './features';

describe('Features', () => {
  it('pinta una tarjeta por cada característica', async () => {
    const fixture = TestBed.createComponent(Features);
    await fixture.whenStable();
    const tarjetas = (fixture.nativeElement as HTMLElement).querySelectorAll('li');
    expect(tarjetas.length).toBe(fixture.componentInstance.caracteristicas.length);
  });
});
