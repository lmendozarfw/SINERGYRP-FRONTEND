import { Component, inject, signal, viewChild } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputPassword } from 'primeng/inputpassword';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import {
  PIcon
} from '@primeicons/angular';
import { EtiquetaFormularioComponente } from '@compartido/componentes/form-label/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { QrScannerComponente } from '@compartido/componentes/qr-scanner/qr-scanner.componente';
import { AutenticacionStore } from '@funcionalidades/autenticacion/stores/autenticacion.store';
import { AvisosServicio } from '@nucleo/servicios/aviso.servicio';
import { InicioSesionComando } from '@funcionalidades/autenticacion/casos-uso/inicio-sesion.caso-uso';

export interface ICredencialQR {
  usuario: string;
  contrasena: string;
}

export function interpretarQR(raw: string): ICredencialQR | null {
  const texto = raw.trim();
  if (!texto) return null;
  // El codigo QR del gafete tiene solo el numero de empleado
  return convertirACredenciales(texto, texto);
}

function convertirACredenciales(usuario: unknown, contrasena: unknown): ICredencialQR | null {
  const nombreUsuario = String(usuario ?? '').trim();
  const secreto = String(contrasena ?? '');
  return nombreUsuario && secreto ? { usuario: nombreUsuario, contrasena: secreto } : null;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './inicio-sesion.pagina.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EtiquetaFormularioComponente,
    MensajeAyudaErrorComponente,
    QrScannerComponente,
    InputText,
    InputPassword,
    IconField,
    InputIcon,
    Select,
    Checkbox,
    ButtonDirective,
    PIcon
  ],
})
export class InicioSesionPagina {
  loginForm: FormGroup;

  authStore = inject(AutenticacionStore);
  rutas = inject(Router);
  private readonly avisos = inject(AvisosServicio);
  private readonly qrScanner = viewChild(QrScannerComponente);

  readonly empresas = [
    { label: 'Grupo Raudal', value: 'grupo-raudal' },
    { label: 'Industrias del Norte', value: 'industrias-norte' },
    { label: 'Comercial Delta', value: 'comercial-delta' },
    { label: 'Organización Vertice', value: 'organizacion-vertice' },
  ];

  readonly empresaControl = new FormControl('', [Validators.required]);

  readonly mode = signal<'qr' | 'manual'>('qr');
  readonly badgeCredentials = signal<ICredencialQR | null>(null);
  readonly passwordMask = signal(true);
  remember = false;

  constructor() {
    this.loginForm = new FormGroup({
      empresa: this.empresaControl,
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get empresaError(): string | null {
    const control = this.empresaControl;
    if ((!control.touched && !control.dirty) || !control.errors) return null;
    if (control.errors['required']) return 'Selecciona una empresa';
    return null;
  }

  get userError(): string | null {
    const control = this.loginForm.get('user');
    if (!control || (!control.touched && !control.dirty) || !control.errors) return null;
    if (control.errors['required']) return 'El usuario es obligatorio';
    return null;
  }

  get passwordError(): string | null {
    const control = this.loginForm.get('password');
    if (!control || (!control.touched && !control.dirty) || !control.errors) return null;
    if (control.errors['required']) return 'La contraseña es obligatoria';
    return null;
  }

  toggleMode(): void {
    this.badgeCredentials.set(null);
    this.mode.update((mode) => (mode === 'qr' ? 'manual' : 'qr'));
  }

  togglePasswordMask(): void {
    this.passwordMask.update((mask) => !mask);
  }

  recoverPassword(): void {
    this.avisos.informacion(
      'Recuperación de contraseña',
      'Contacta al administrador de tu espacio corporativo.',
    );
  }

  async onBadgeScanned(decodedText: string): Promise<void> {
    if (this.authStore.cargando()) return;
    const credentials = interpretarQR(decodedText);
    if (!credentials) {
      this.avisos.advertencia('El QR escaneado no contiene credenciales válidas');
      this.resumeScanner();
      return;
    }
    this.badgeCredentials.set(credentials);
    await this.entrar();
  }

  async onSubmit(): Promise<void> {
    if (this.authStore.cargando()) return;
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    await this.entrar();
  }

  private resumeScanner(): void {
    this.qrScanner()?.resume();
  }

  private comandoActual(): InicioSesionComando | null {
    if (!this.empresaControl.value) {
      this.empresaControl.markAsTouched();
      this.avisos.advertencia('Selecciona una empresa');
      if (this.mode() === 'qr') this.resumeScanner();
      return null;
    }

    if (this.mode() === 'qr') {
      const credenciales = this.badgeCredentials();
      if (!credenciales) {
        this.avisos.advertencia('Escanea el QR de tu gafete');
        this.resumeScanner();
        return null;
      }
      return { nombreUsuario: credenciales.usuario, contrasena: credenciales.contrasena };
    }

    return {
      nombreUsuario: this.loginForm.value['user'] ?? '',
      contrasena: this.loginForm.value['password'] ?? '',
    };
  }

  private async entrar(): Promise<void> {
    const comando = this.comandoActual();
    if (!comando) return;

    // await this.authStore.inicioSesion(comando);

    // const error = this.authStore.error();
    // if (error) {
    //   if (this.mode() === 'qr') {
    //     this.badgeCredentials.set(null);
    //     this.resumeScanner();
    //   }
    //   this.avisos.error('No se pudo iniciar sesión', error);
    //   return;
    // }

    await this.rutas.navigate(['/app/clientes']);
  }
}
