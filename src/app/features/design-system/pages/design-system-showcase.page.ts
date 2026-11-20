import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { InputPassword } from 'primeng/inputpassword';
import { InputText } from 'primeng/inputtext';
import {
  PIcon,
} from '@primeicons/angular';
import { FormLabelComponent } from '../../../shared/components/form-label/form-label.component';
import { EncabezadoPaginaComponent } from '../../../shared/components/encabezado-pagina/encabezado-pagina.component';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-design-system-showcase',
  imports: [
    FormsModule,
    RouterLink,
    ButtonDirective,
    Card,
    Checkbox,
    InputText,
    InputPassword,
    FormLabelComponent,
    EncabezadoPaginaComponent,
    PIcon
  ],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div class="mx-auto flex max-w-6xl flex-col gap-8">
        <app-encabezado-pagina
          eyebrow="SINERGYRP · Design System"
          titulo="Componentes y fundamentos"
          descripcion="Referencia visual de la paleta, tipografía y componentes. Usa Tab para ver el anillo de foco."
          nivel="h1"
        >
          <a routerLink="/auth/login" class="ds-button ds-button--secondary">Ir al login</a>
        </app-encabezado-pagina>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">1. Paleta</h2>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            @for (color of palette; track color.token) {
              <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div class="h-16" [style.background]="'var(' + color.token + ')'"></div>
                <div class="p-3">
                  <p class="ds-meta">{{ color.name }}</p>
                  <p class="ds-body font-medium">{{ color.value }}</p>
                </div>
              </div>
            }
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">2. Tipografía</h2>
          <div class="ds-card flex flex-col divide-y divide-slate-200">
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Display · 48/48 · Semibold</span>
              <span class="ds-display">Operaciones</span>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Título página · 32/40 · Semibold</span>
              <span class="ds-title-page">Operaciones bajo control</span>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Título sección · 24/32 · Semibold</span>
              <span class="ds-title-section">Visión general del negocio</span>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Título card · 18/26 · Semibold</span>
              <span class="ds-title-card">Resumen financiero</span>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Cuerpo · 14/22 · Regular</span>
              <span class="ds-body">Texto descriptivo, párrafos y contenido de interfaz.</span>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Label · 14/20 · Medium</span>
              <span class="ds-label">Etiqueta de formulario</span>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span class="ds-meta w-40 shrink-0">Meta · 12/18 · Regular</span>
              <span class="ds-meta">Última actualización: hoy, 09:30</span>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">3. Botones</h2>
          <div class="ds-card flex flex-wrap items-center gap-3">
            <button pButton class="ds-button">Primario</button>
            <button pButton class="ds-button ds-button--secondary">Secundario</button>
            <button pButton class="ds-button ds-button--text">Texto</button>
            <button pButton class="ds-button ds-button--compact">Compacto · 36px</button>
            <button pButton class="ds-button ds-button--wide">Amplio · 48px</button>
            <button pButton class="ds-button" disabled>Deshabilitado</button>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">4. Inputs y formularios</h2>
          <div class="ds-card grid gap-6 md:grid-cols-3">
            <div class="ds-field">
              <app-form-label for="field-default">Nombre de usuario</app-form-label>
              <input
                pInputText
                id="field-default"
                [(ngModel)]="user"
                placeholder="nombre.apellido"
              />
              <span class="ds-field-help">Texto de ayuda debajo del campo</span>
            </div>

            <div class="ds-field">
              <app-form-label for="field-error" required>Contraseña</app-form-label>
              <input pInputText id="field-error" value="abc123" [invalid]="true" />
              <span class="ds-field-error">
                <svg pIcon="exclamation-triangle" [size]="14"></svg>
                La contraseña no cumple los requisitos
              </span>
            </div>

            <div class="ds-field">
              <app-form-label for="field-disabled">Campo deshabilitado</app-form-label>
              <input pInputText id="field-disabled" value="Solo lectura" disabled />
              <span class="ds-field-help">El estado también se acompaña de texto.</span>
            </div>

            <div class="ds-field">
              <app-form-label for="field-password">Password</app-form-label>
              <div class="relative">
                <input pInputPassword id="field-password" [(ngModel)]="password" [mask]="mask" />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-slate-600 hover:text-ds-primary"
                  [attr.aria-label]="mask ? 'Mostrar contraseña' : 'Ocultar contraseña'"
                  (click)="mask = !mask"
                >
                  <svg pIcon="eye" [size]="16"></svg>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2 self-end pb-6">
              <p-checkbox
                class="ds-checkbox"
                [(ngModel)]="accepted"
                [binary]="true"
                inputId="field-checkbox"
              />
              <label class="ds-label" for="field-checkbox">Aceptar términos</label>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">5. Cards</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <p-card class="ds-card" header="Resumen financiero" subheader="Actualizado hoy, 09:30">
              <p class="ds-body text-slate-600">
                Las cards usan bordes sutiles, radio de 12 px y padding interno de 24 px.
              </p>
              <div class="mt-4 flex justify-end">
                <button pButton class="ds-button ds-button--text">Ver detalle</button>
              </div>
            </p-card>
            <div class="ds-card">
              <h3 class="ds-title-card">Activos registrados</h3>
              <p class="ds-body mt-1 text-slate-600">1,284</p>
              <p class="ds-meta mt-2">Incremento del 8% respecto al mes anterior</p>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">6. Sidebar</h2>
          <div class="ds-card flex justify-center p-0!">
            <div class="flex min-h-[420px] w-72 flex-col rounded-xl border-r border-[var(--ds-navy-line)] bg-navy-950 text-white">
              <div class="flex items-center gap-3 border-b border-[var(--ds-navy-line)] px-4 py-6">
                <div
                  class="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white"
                >
                  N
                </div>
                <span class="text-sm font-semibold text-white">Nexo ERP</span>
              </div>
              <p class="px-4 pt-6 pb-2 text-xs font-semibold leading-[18px] tracking-[0.08em] text-[var(--ds-navy-muted)] uppercase">Principal</p>
              <nav class="flex flex-col gap-1 px-3">
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]"
                  data-active="true">
                  <svg pIcon="home" [size]="16"></svg>
                  Inicio
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]">
                  <svg pIcon="inbox" [size]="16"></svg>
                  Operaciones
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]">
                  <svg pIcon="users" [size]="16"></svg>
                  Clientes
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]">
                  <svg pIcon="search" [size]="16"></svg>
                  Consultas
                </button>
              </nav>
              <div class="mx-3 my-4 h-px bg-[var(--ds-navy-line)]"></div>
              <nav class="flex flex-col gap-1 px-3">
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]">
                  <svg pIcon="bell" [size]="16"></svg>
                  Notificaciones
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]">
                  <svg pIcon="cog" [size]="16"></svg>
                  Configuración
                </button>
              </nav>
              <div class="mt-auto border-t border-[var(--ds-navy-line)] px-4 py-4 text-xs leading-[18px] text-[var(--ds-navy-muted)]">Nexo ERP · Espacio corporativo</div>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">7. Estados semánticos</h2>
          <div class="grid gap-3 md:grid-cols-2">
            <div class="ds-alert ds-alert--success">
              <svg pIcon="check-circle" [size]="16"></svg>
              <span><b>Éxito:</b> los cambios se guardaron correctamente.</span>
            </div>
            <div class="ds-alert ds-alert--info">
              <svg pIcon="info-circle" [size]="16"></svg>
              <span><b>Aviso:</b> revisa la información antes de continuar.</span>
            </div>
            <div class="ds-alert ds-alert--warning">
              <svg pIcon="exclamation-triangle" [size]="16"></svg>
              <span><b>Advertencia:</b> existen registros pendientes.</span>
            </div>
            <div class="ds-alert ds-alert--error">
              <svg pIcon="exclamation-triangle" [size]="16"></svg>
              <span><b>Error:</b> no fue posible completar la operación.</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class DesignSystemShowcasePage {
  private readonly breadcrumb = inject(BreadcrumbService);

  readonly palette = [
    { name: 'Navy 950', token: '--ds-navy', value: '#101D30' },
    { name: 'Blue 600 · Acción', token: '--ds-action', value: '#2563EB' },
    { name: 'Slate 900 · Texto', token: '--ds-ink', value: '#18283E' },
    { name: 'Slate 600 · Secundario', token: '--ds-ink-muted', value: '#536479' },
    { name: 'Slate 200 · Borde', token: '--ds-line', value: '#DCE3EC' },
    { name: 'Slate 50 · Fondo', token: '--ds-canvas', value: '#F6F8FB' },
    { name: 'Superficie', token: '--ds-surface', value: '#FFFFFF' },
    { name: 'Éxito', token: '--ds-success', value: '#15803D' },
    { name: 'Aviso', token: '--ds-warning', value: '#B45309' },
    { name: 'Error', token: '--ds-danger', value: '#DC2626' },
  ];

  user = '';
  password = '';
  mask = true;
  accepted = false;

  constructor() {
    this.breadcrumb.setItems([
      { key: 'configuration', label: 'Configuración', route: '/app/configuration' },
      { key: 'components', label: 'Componentes', route: '/design-system', disabled: true },
    ]);
  }
}
