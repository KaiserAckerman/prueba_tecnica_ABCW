import { TestBed } from '@angular/core/testing';
import { Faq } from './faq';

describe('Faq', () => {
  it('abre una pregunta a la vez y la cierra al pulsarla de nuevo', async () => {
    const fixture = TestBed.createComponent(Faq);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const botones = el.querySelectorAll('button');

    expect(el.querySelectorAll('[id^="respuesta-"]').length).toBe(0);

    botones[0].click();
    await fixture.whenStable();
    expect(el.querySelectorAll('[id^="respuesta-"]').length).toBe(1);
    expect(botones[0].getAttribute('aria-expanded')).toBe('true');

    botones[1].click();
    await fixture.whenStable();
    expect(el.querySelectorAll('[id^="respuesta-"]').length).toBe(1);
    expect(botones[0].getAttribute('aria-expanded')).toBe('false');
    expect(botones[1].getAttribute('aria-expanded')).toBe('true');

    botones[1].click();
    await fixture.whenStable();
    expect(el.querySelectorAll('[id^="respuesta-"]').length).toBe(0);
  });
});
