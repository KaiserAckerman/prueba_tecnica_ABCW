import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Campo = 'nombre' | 'correo' | 'mensaje';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html'
})
export class ContactForm {
  readonly formulario = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    // Validators.email acepta "a@b"; el patrón exige además un punto en el dominio.
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
    }),
    mensaje: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  });

  readonly enviado = signal(false);
  readonly nombreEnviado = signal('');

  // Devuelve el texto del error de un campo, o null si no hay que mostrar ninguno.
  // Solo muestra errores cuando el usuario ya salió del campo (touched) o intentó enviar.
  mensajeError(nombreCampo: Campo): string | null {
    const campo = this.formulario.controls[nombreCampo];
    if (!campo.touched || campo.valid) {
      return null;
    }
    if (campo.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (campo.hasError('minlength')) {
      return `Escribe al menos ${campo.getError('minlength').requiredLength} caracteres.`;
    }
    return 'Escribe un correo válido, por ejemplo nombre@correo.com.';
  }

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    // Envío simulado: no hay backend, solo mostramos el mensaje de éxito.
    this.nombreEnviado.set(this.formulario.controls.nombre.value);
    this.enviado.set(true);
    this.formulario.reset();
  }
}
