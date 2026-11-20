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
  CheckCircle,
  Eye,
  EyeSlash,
  InfoCircle,
  Pencil,
  Qrcode,
  SignIn,
  Spinner,
  User,
} from '@primeicons/angular';
import { FormLabelComponent } from '../../../../shared/components/form-label/form-label.component';
import { MensajeAyudaErrorComponent } from '../../../../shared/components/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { QrScannerComponent } from '../../../../shared/components/qr-scanner/qr-scanner.component';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthStore } from '../../stores/auth.store';

export interface BadgeCredentials {
  username: string;
  password: string;
}

export function parseBadgeQr(raw: string): BadgeCredentials | null {
  console.log('parseBadgeQr', raw);
  const text = raw.trim();
  if (!text) return null;

  if (text.startsWith('{')) {
    try {
      const data = JSON.parse(text) as Record<string, unknown>;
      console.log('parseBadgeQr - Parsed JSON:', data);
      return toCredentials(
        data['usuario'] ?? data['user'] ?? data['username'],
        data['password'] ?? data['clave'],
      );
    } catch {
      return null;
    }
  }

  if (text.startsWith('?') || /^[a-z][a-z0-9+.-]*:\/\//i.test(text)) {
    try {
      const params = new URL(text, window.location.origin).searchParams;
      return toCredentials(
        params.get('usuario') ?? params.get('user') ?? params.get('username'),
        params.get('password') ?? params.get('clave'),
      );
    } catch {
      return null;
    }
  }

  const separator = text.includes('|') ? '|' : text.includes(':') ? ':' : null;
  if (!separator) return null;
  const index = text.indexOf(separator);
  return toCredentials(text.slice(0, index), text.slice(index + 1));
}

function toCredentials(username: unknown, password: unknown): BadgeCredentials | null {
  const user = String(username ?? '').trim();
  const secret = String(password ?? '');
  return user && secret ? { username: user, password: secret } : null;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormLabelComponent,
    MensajeAyudaErrorComponent,
    QrScannerComponent,
    InputText,
    InputPassword,
    IconField,
    InputIcon,
    Select,
    Checkbox,
    ButtonDirective,
    CheckCircle,
    User,
    InfoCircle,
    SignIn,
    Spinner,
    Pencil,
    Qrcode,
    Eye,
    EyeSlash,
  ],
})
export class LoginPage {
  loginForm: FormGroup;

  authStore = inject(AuthStore);
  router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly qrScanner = viewChild(QrScannerComponent);

  readonly empresas = [
    { label: 'Grupo Raudal', value: 'grupo-raudal' },
    { label: 'Industrias del Norte', value: 'industrias-norte' },
    { label: 'Comercial Delta', value: 'comercial-delta' },
    { label: 'Organización Vertice', value: 'organizacion-vertice' },
  ];

  readonly empresaControl = new FormControl('', [Validators.required]);

  readonly mode = signal<'qr' | 'manual'>('qr');
  readonly badgeUser = signal<string | null>(null);
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
    this.badgeUser.set(null);
    this.mode.update((mode) => (mode === 'qr' ? 'manual' : 'qr'));
  }

  togglePasswordMask(): void {
    this.passwordMask.update((mask) => !mask);
  }

  recoverPassword(): void {
    this.toast.info(
      'Recuperación de contraseña',
      'Contacta al administrador de tu espacio corporativo.',
    );
  }

  async onBadgeScanned(decodedText: string): Promise<void> {
    if (this.authStore.loading()) return;
    const credentials = parseBadgeQr(decodedText);
    if (!credentials) {
      this.toast.warning('El QR escaneado no contiene credenciales válidas');
      this.resumeScanner();
      return;
    }
    this.badgeUser.set(credentials.username);
    await this.entrar();
  }

  async onSubmit(): Promise<void> {
    if (this.authStore.loading()) return;
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    await this.entrar();
  }

  private resumeScanner(): void {
    this.qrScanner()?.resume();
  }

  private async entrar(): Promise<void> {
    await this.router.navigate(['/app/clients']);
  }
}
