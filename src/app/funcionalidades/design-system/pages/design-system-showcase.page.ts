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
import { FormLabelComponent } from '../../../compartido/componentes/form-label/form-label.component';
import { EncabezadoPaginaComponent } from '../../../compartido/componentes/encabezado-pagina/encabezado-pagina.component';
import { BreadcrumbServicio } from '../../../nucleo/servicios/breadcrumb.servicio';

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
    <div class="min-h-screen bg-ds-canvas p-6 lg:p-10">
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
              <div class="overflow-hidden rounded-xl border border-ds-line bg-ds-surface">
                <div class="h-16" [style.background]="'var(' + color.token + ')'"></div>
                <div class="p-3">
                  <p class="ds-meta">{{ color.name }}</p>
                  <p class="ds-body font-medium">{{ paletteValue(color.token) }}</p>
                </div>
              </div>
            }
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">2. Tipografía</h2>
          <div class="ds-card flex flex-col divide-y divide-ds-line">
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
                  class="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ds-muted hover:text-ds-primary"
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
              <p class="ds-body text-ds-muted">
                Las cards usan bordes sutiles, radio de 12 px y padding interno de 24 px.
              </p>
              <div class="mt-4 flex justify-end">
                <button pButton class="ds-button ds-button--text">Ver detalle</button>
              </div>
            </p-card>
            <div class="ds-card">
              <h3 class="ds-title-card">Activos registrados</h3>
              <p class="ds-body mt-1 text-ds-muted">1,284</p>
              <p class="ds-meta mt-2">Incremento del 8% respecto al mes anterior</p>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h2 class="ds-title-section">6. Sidebar</h2>
          <div class="ds-card flex justify-center p-0!">
            <div class="flex min-h-[420px] w-72 flex-col rounded-xl border-r border-ds-navy-line bg-ds-navy text-ds-on-navy">
              <div class="flex items-center gap-3 border-b border-ds-navy-line px-4 py-6">
                <div
                  class="flex size-8 shrink-0 items-center justify-center rounded-md bg-ds-primary text-sm font-bold text-ds-on-primary"
                >
                  N
                </div>
                <span class="text-sm font-semibold text-ds-on-navy">Nexo ERP</span>
              </div>
              <p class="px-4 pt-6 pb-2 text-xs font-semibold leading-[18px] tracking-[0.08em] text-ds-navy-muted uppercase">Principal</p>
              <nav class="flex flex-col gap-1 px-3">
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover"
                  data-active="true">
                  <svg pIcon="home" [size]="16"></svg>
                  Inicio
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover">
                  <svg pIcon="inbox" [size]="16"></svg>
                  Operaciones
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover">
                  <svg pIcon="users" [size]="16"></svg>
                  Clientes
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover">
                  <svg pIcon="search" [size]="16"></svg>
                  Consultas
                </button>
              </nav>
              <div class="mx-3 my-4 h-px bg-ds-navy-line"></div>
              <nav class="flex flex-col gap-1 px-3">
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover">
                  <svg pIcon="bell" [size]="16"></svg>
                  Notificaciones
                </button>
                <button type="button"
                  class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent px-3 text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover">
                  <svg pIcon="cog" [size]="16"></svg>
                  Configuración
                </button>
              </nav>
              <div class="mt-auto border-t border-ds-navy-line px-4 py-4 text-xs leading-[18px] text-ds-navy-muted">Nexo ERP · Espacio corporativo</div>
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
  private readonly breadcrumb = inject(BreadcrumbServicio);

  readonly palette = [
    { name: 'Navy 950', token: '--ds-navy' },
    { name: 'Blue 600 · Acción', token: '--ds-action' },
    { name: 'Slate 900 · Texto', token: '--ds-ink' },
    { name: 'Slate 600 · Secundario', token: '--ds-ink-muted' },
    { name: 'Slate 200 · Borde', token: '--ds-line' },
    { name: 'Slate 50 · Fondo', token: '--ds-canvas' },
    { name: 'Superficie', token: '--ds-surface' },
    { name: 'Éxito', token: '--ds-success' },
    { name: 'Aviso', token: '--ds-warning' },
    { name: 'Error', token: '--ds-danger' },
  ];

  paletteValue(token: string): string {
    if (typeof document === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim().toUpperCase();
  }

  user = '';
  password = '';
  mask = true;
  accepted = false;

  constructor() {
    this.breadcrumb.configurar([
      { llave: 'configuration', etiqueta: 'Configuración', ruta: '/app/configuration' },
      { llave: 'components', etiqueta: 'Componentes', ruta: '/design-system', deshabilitado: true },
    ]);
  }
}
