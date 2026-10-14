import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  let el: HTMLElement;
  let fixture: ComponentFixture<ContactForm>;

  async function escribir(id: string, valor: string) {
    const campo = el.querySelector<HTMLInputElement>('#' + id)!;
    campo.value = valor;
    campo.dispatchEvent(new Event('input'));
    campo.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(ContactForm);
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('no muestra errores hasta que el usuario toca un campo', () => {
    expect(el.querySelectorAll('[id^="error-"]').length).toBe(0);
  });

  it('muestra error al salir de un campo con un correo inválido', async () => {
    await escribir('correo', 'a@b');
    expect(el.querySelector('#error-correo')?.textContent).toContain('correo válido');
    expect(el.querySelector('#correo')?.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('#correo')?.getAttribute('aria-describedby')).toBe('error-correo');
  });

  it('muestra los tres errores al enviar vacío y no muestra el éxito', async () => {
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(el.querySelectorAll('[id^="error-"]').length).toBe(3);
    expect(el.textContent).not.toContain('Gracias');
  });

  it('muestra el mensaje de éxito y limpia el formulario si todo es válido', async () => {
    await escribir('nombre', 'Camila');
    await escribir('correo', 'camila@correo.com');
    await escribir('mensaje', 'Quisiera pedir granos molidos.');
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(el.textContent).toContain('¡Gracias, Camila!');
    expect(el.querySelector<HTMLInputElement>('#nombre')!.value).toBe('');
  });
});
