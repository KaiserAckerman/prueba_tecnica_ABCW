import { TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  it('abre y cierra el menú móvil con el botón', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const boton = el.querySelector('button')!;

    expect(el.querySelector('#menu-movil')).toBeNull();
    expect(boton.getAttribute('aria-expanded')).toBe('false');

    boton.click();
    await fixture.whenStable();
    expect(el.querySelector('#menu-movil')).not.toBeNull();
    expect(boton.getAttribute('aria-expanded')).toBe('true');

    boton.click();
    await fixture.whenStable();
    expect(el.querySelector('#menu-movil')).toBeNull();
  });
});
