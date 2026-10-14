import { TestBed } from '@angular/core/testing';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  it('pinta un testimonio por cada elemento del arreglo', async () => {
    const fixture = TestBed.createComponent(Testimonials);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('blockquote').length).toBe(fixture.componentInstance.testimonios.length);
  });
});
