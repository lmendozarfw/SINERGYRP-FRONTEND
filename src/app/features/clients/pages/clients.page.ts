import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Eye, Filter, Pencil, Plus, Search, Trash } from '@primeicons/angular';
import { BulkActionsBarComponent } from '../../../shared/components/bulk-actions-bar/bulk-actions-bar.component';
import { FormLabelComponent } from '../../../shared/components/form-label/form-label.component';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { Client } from '../models/client.model';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-clients-page',
  styleUrl: './clients.page.css',
  imports: [
    DecimalPipe,
    Drawer,
    IconField,
    InputIcon,
    InputText,
    Select,
    TableModule,
    Tag,
    BulkActionsBarComponent,
    FormLabelComponent,
    Eye,
    Filter,
    Pencil,
    Plus,
    Search,
    Trash,
  ],
  template: `
    <div class="ds-clients-page">
      <section class="ds-clients-heading">
        <div class="min-w-0">
          <h2 class="ds-title-page mt-1">Clientes</h2>
          <p class="ds-body mt-1 max-w-2xl text-[var(--ds-text-muted)]">
            Consulta la información fiscal y comercial de tus clientes, y administra sus condiciones
            de crédito desde un solo lugar.
          </p>
        </div>
        <button type="button" class="ds-button" (click)="openDrawer()">
          <svg data-p-icon="plus" [size]="16"></svg>
          Nuevo cliente
        </button>
      </section>

      <div class="ds-clients-filters mt-8">
        <p-iconfield iconPosition="left" class="ds-clients-search">
          <p-inputicon>
            <svg data-p-icon="search" [size]="16"></svg>
          </p-inputicon>
          <input
            pInputText
            type="text"
            class="ds-input"
            placeholder="Buscar por nombre o RFC"
            aria-label="Buscar clientes"
          />
        </p-iconfield>

        <p-select
          class="ds-clients-select"
          [options]="tipoPersonaOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Tipo de persona"
          aria-label="Filtrar por tipo de persona"
        />
        <p-select
          class="ds-clients-select"
          [options]="regimenOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Régimen fiscal"
          aria-label="Filtrar por régimen fiscal"
        />
        <button type="button" class="ds-button ds-button--secondary">
          <svg data-p-icon="filter" [size]="14"></svg>
          Filtros
        </button>
      </div>

      <section class="ds-card ds-clients-card">
        <p-table
          styleClass="ds-table"
          [value]="clients"
          dataKey="rfc"
          selectionMode="multiple"
          [selection]="selectedClients()"
          (selectionChange)="selectedClients.set($event)"
          [paginator]="true"
          [rows]="6"
          [rowsPerPageOptions]="[6, 12, 24]"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} clientes"
          [scrollable]="true"
        >
          <ng-template #header>
            <tr>
              <th class="ds-table__th ds-table__th--check">
                <p-table-header-checkbox ariaLabel="Seleccionar todos los clientes" />
              </th>
              <th
                pSortableColumn="nombre_razon_social"
                class="ds-table__th"
                style="width: 300px; min-width: 300px"
              >
                <span class="ds-table__th-content">
                  Cliente
                  <p-sorticon field="nombre_razon_social" />
                </span>
              </th>
              <th pSortableColumn="rfc" class="ds-table__th" style="width: 150px; min-width: 150px">
                <span class="ds-table__th-content">
                  RFC
                  <p-sorticon field="rfc" />
                </span>
              </th>
              <th
                pSortableColumn="tipo_persona"
                class="ds-table__th"
                style="width: 160px; min-width: 160px"
              >
                <span class="ds-table__th-content">
                  Tipo de persona
                  <p-sorticon field="tipo_persona" />
                </span>
              </th>
              <th class="ds-table__th" style="width: 190px; min-width: 190px">Régimen fiscal</th>
              <th
                pSortableColumn="limite_credito"
                class="ds-table__th ds-table__th--right"
                style="width: 175px; min-width: 175px"
              >
                <span class="ds-table__th-content">
                  Límite de crédito
                  <p-sorticon field="limite_credito" />
                </span>
              </th>
              <th
                pSortableColumn="dias_credito"
                class="ds-table__th ds-table__th--right"
                style="width: 90px; min-width: 90px"
              >
                <span class="ds-table__th-content">
                  Días
                  <p-sorticon field="dias_credito" />
                </span>
              </th>
              <th class="ds-table__th ds-table__th--right" style="width: 140px; min-width: 140px">
                Acciones
              </th>
            </tr>
          </ng-template>

          <ng-template #body let-client let-i="index">
            <tr class="ds-table__row">
              <td class="ds-table__td ds-table__td--check">
                <p-table-checkbox [value]="client" [index]="i" ariaLabel="Seleccionar cliente" />
              </td>
              <td class="ds-table__td">
                <div class="ds-client-cell">
                  <span class="ds-client-cell__avatar">
                    {{ client.nombre_razon_social.charAt(0) }}
                  </span>
                  <span class="min-w-0">
                    <span class="ds-client-cell__title">{{ client.nombre_razon_social }}</span>
                    <span class="ds-client-cell__subtitle">{{ client.nombre_comercial }}</span>
                  </span>
                </div>
              </td>
              <td class="ds-table__td">
                <span class="ds-client-cell__mono">{{ client.rfc }}</span>
              </td>
              <td class="ds-table__td">
                <p-tag
                  [value]="client.tipo_persona"
                  [severity]="client.tipo_persona === 'Moral' ? 'info' : 'success'"
                />
              </td>
              <td class="ds-table__td">
                <span class="ds-client-cell__text">{{ client.id_regimen_fiscal }}</span>
              </td>
              <td class="ds-table__td ds-table__td--right">
                <span class="ds-client-cell__amount">
                  {{ '$' + (client.limite_credito | number: '1.0-0') }}
                </span>
              </td>
              <td class="ds-table__td ds-table__td--right">
                <span class="ds-client-cell__text">{{ client.dias_credito }}</span>
              </td>
              <td class="ds-table__td ds-table__td--right">
                <div class="ds-table__actions">
                  <button type="button" class="ds-icon-button" aria-label="Ver cliente">
                    <svg data-p-icon="eye" [size]="15"></svg>
                  </button>
                  <button type="button" class="ds-icon-button" aria-label="Editar cliente">
                    <svg data-p-icon="pencil" [size]="15"></svg>
                  </button>
                  <button
                    type="button"
                    class="ds-icon-button ds-icon-button--danger"
                    aria-label="Eliminar cliente"
                  >
                    <svg data-p-icon="trash" [size]="15"></svg>
                  </button>
                </div>
              </td>
            </tr>
          </ng-template>

          <ng-template #emptymessage>
            <tr>
              <td colspan="8" class="ds-table__empty">
                No hay clientes que coincidan con los filtros seleccionados.
              </td>
            </tr>
          </ng-template>
        </p-table>
      </section>
    </div>

    <p-drawer
      [(visible)]="drawerVisible"
      position="right"
      styleClass="ds-client-drawer"
      header="Nuevo cliente"
      [modal]="true"
      [dismissible]="true"
      [closeOnEscape]="true"
      [blockScroll]="true"
    >
      <form class="ds-client-form" (submit)="$event.preventDefault()">
        <section class="ds-client-form__section">
          <h3 class="ds-client-form__title">Datos generales</h3>
          <div class="ds-client-form__grid">
            <div class="ds-field">
              <app-form-label for="client-razon-social" [required]="true">
                Nombre o razón social
              </app-form-label>
              <input
                id="client-razon-social"
                pInputText
                type="text"
                class="ds-input"
                placeholder="Ej. Grupo Industrial Raudal, S.A. de C.V."
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-nombre-comercial">Nombre comercial</app-form-label>
              <input
                id="client-nombre-comercial"
                pInputText
                type="text"
                class="ds-input"
                placeholder="Ej. Raudal"
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-tipo-persona" [required]="true">
                Tipo de persona
              </app-form-label>
              <p-select
                inputId="client-tipo-persona"
                class="w-full"
                [options]="tipoPersonaOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una opción"
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-rfc" [required]="true">RFC</app-form-label>
              <input
                id="client-rfc"
                pInputText
                type="text"
                class="ds-input uppercase"
                placeholder="Ej. RIR240315AB1"
                maxlength="13"
              />
              <p class="ds-field-help">Registro Federal de Contribuyentes.</p>
            </div>
          </div>
        </section>

        <section class="ds-client-form__section">
          <h3 class="ds-client-form__title">Configuración fiscal</h3>
          <div class="ds-client-form__grid">
            <div class="ds-field">
              <app-form-label for="client-regimen-fiscal">ID régimen fiscal</app-form-label>
              <p-select
                inputId="client-regimen-fiscal"
                class="w-full"
                [options]="regimenOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una opción"
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-tipo-iva">ID tipo de IVA</app-form-label>
              <p-select
                inputId="client-tipo-iva"
                class="w-full"
                [options]="ivaOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una opción"
              />
            </div>
            <div class="ds-field ds-client-form__full">
              <app-form-label for="client-uso-cfdi">ID uso de CFDI predeterminado</app-form-label>
              <p-select
                inputId="client-uso-cfdi"
                class="w-full"
                [options]="usoCfdiOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una opción"
              />
            </div>
          </div>
        </section>

        <section class="ds-client-form__section">
          <h3 class="ds-client-form__title">Condiciones comerciales</h3>
          <div class="ds-client-form__grid">
            <div class="ds-field">
              <app-form-label for="client-forma-pago"
                >ID forma de pago predeterminada</app-form-label
              >
              <p-select
                inputId="client-forma-pago"
                class="w-full"
                [options]="formaPagoOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una opción"
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-metodo-pago"
                >ID método de pago predeterminado</app-form-label
              >
              <p-select
                inputId="client-metodo-pago"
                class="w-full"
                [options]="metodoPagoOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una opción"
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-limite-credito">Límite de crédito</app-form-label>
              <input
                id="client-limite-credito"
                pInputText
                type="text"
                class="ds-input"
                inputmode="decimal"
                placeholder="0.00"
              />
            </div>
            <div class="ds-field">
              <app-form-label for="client-dias-credito">Días de crédito</app-form-label>
              <input
                id="client-dias-credito"
                pInputText
                type="number"
                class="ds-input"
                placeholder="0"
                min="0"
              />
            </div>
            <div class="ds-field ds-client-form__full">
              <app-form-label for="client-observaciones">Observaciones</app-form-label>
              <textarea
                id="client-observaciones"
                pInputText
                rows="4"
                class="ds-input ds-client-form__textarea"
                placeholder="Notas internas sobre el cliente…"
              ></textarea>
            </div>
          </div>
        </section>
      </form>

      <ng-template #footer>
        <div class="ds-client-drawer__footer">
          <button
            type="button"
            class="ds-button ds-button--secondary"
            (click)="drawerVisible.set(false)"
          >
            Cancelar
          </button>
          <button type="button" class="ds-button">Guardar cliente</button>
        </div>
      </ng-template>
    </p-drawer>

    @if (selectedClients().length > 0) {
      <app-bulk-actions-bar
        [count]="selectedClients().length"
        (clear)="clearSelection()"
        (remove)="clearSelection()"
      />
    }
  `,
})
export class ClientsPage {
  private readonly breadcrumb = inject(BreadcrumbService);

  readonly drawerVisible = signal(false);
  readonly selectedClients = signal<Client[]>([]);

  readonly tipoPersonaOptions: SelectOption[] = [
    { label: 'Física', value: 'Física' },
    { label: 'Moral', value: 'Moral' },
  ];
  readonly regimenOptions: SelectOption[] = [
    { label: '601 · General de Ley Personas Morales', value: '601 · General' },
    { label: '612 · Personas Físicas con Actividades Empresariales', value: '612 · PFAE' },
    { label: '616 · Sin obligaciones fiscales', value: '616 · Sin obligaciones' },
  ];
  readonly ivaOptions: SelectOption[] = [
    { label: 'IVA 16%', value: 'IVA 16%' },
    { label: 'IVA 8%', value: 'IVA 8%' },
    { label: 'Exento', value: 'Exento' },
  ];
  readonly usoCfdiOptions: SelectOption[] = [
    { label: 'G01 · Adquisición de mercancías', value: 'G01' },
    { label: 'G03 · Gastos generales', value: 'G03' },
    { label: 'I01 · Ingresos por ventas', value: 'I01' },
  ];
  readonly formaPagoOptions: SelectOption[] = [
    { label: '01 · Efectivo', value: '01 · Efectivo' },
    { label: '03 · Transferencia electrónica', value: '03 · Transferencia' },
    { label: '04 · Tarjeta de crédito', value: '04 · Tarjeta' },
  ];
  readonly metodoPagoOptions: SelectOption[] = [
    { label: 'PUE · Pago en una sola exhibición', value: 'PUE' },
    { label: 'PPD · Pago en parcialidades o diferido', value: 'PPD' },
  ];

  readonly clients: Client[] = [
    {
      nombre_razon_social: 'Grupo Industrial Raudal, S.A. de C.V.',
      nombre_comercial: 'Raudal',
      tipo_persona: 'Moral',
      rfc: 'RIR240315AB1',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PPD',
      limite_credito: 150000,
      dias_credito: 30,
      observaciones: 'Cliente preferente con facturación mensual.',
    },
    {
      nombre_razon_social: 'Comercializadora Nova, S. de R.L. de C.V.',
      nombre_comercial: 'Nova',
      tipo_persona: 'Moral',
      rfc: 'CNO890412H23',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G01',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 85000,
      dias_credito: 15,
      observaciones: 'Solicita factura por cada pedido.',
    },
    {
      nombre_razon_social: 'Laura Gutiérrez Méndez',
      nombre_comercial: 'Estudio Gutiérrez',
      tipo_persona: 'Física',
      rfc: 'GUML850921E45',
      id_regimen_fiscal: '612 · PFAE',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '04 · Tarjeta',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 25000,
      dias_credito: 0,
      observaciones: 'Pago de contado por defecto.',
    },
    {
      nombre_razon_social: 'Manufacturas del Norte, S.A. de C.V.',
      nombre_comercial: 'Man Norte',
      tipo_persona: 'Moral',
      rfc: 'MNO750618K12',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'IVA 16%',
      id_uso_cfdi_predeterminado: 'G01',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PPD',
      limite_credito: 220000,
      dias_credito: 45,
      observaciones: 'Requiere orden de compra para cada entrega.',
    },
    {
      nombre_razon_social: 'Servicios Profesionales Ámbar, S.C.',
      nombre_comercial: 'Ámbar',
      tipo_persona: 'Moral',
      rfc: 'SPA910203R77',
      id_regimen_fiscal: '601 · General',
      id_tipo_iva: 'Exento',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 0,
      dias_credito: 0,
      observaciones: 'Sin línea de crédito autorizada.',
    },
    {
      nombre_razon_social: 'Fernando Ríos Castro',
      nombre_comercial: 'Ríos y Asociados',
      tipo_persona: 'Física',
      rfc: 'RICF790114M31',
      id_regimen_fiscal: '612 · PFAE',
      id_tipo_iva: 'IVA 8%',
      id_uso_cfdi_predeterminado: 'G03',
      id_forma_pago_predeterminada: '01 · Efectivo',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 12000,
      dias_credito: 8,
      observaciones: 'Contacto principal: fernando.rios@example.com.',
    },
    {
      nombre_razon_social: 'Distribuidora Solstice, S.A. de C.V.',
      nombre_comercial: 'Solstice',
      tipo_persona: 'Moral',
      rfc: 'DSO160902TQ8',
      id_regimen_fiscal: '616 · Sin obligaciones',
      id_tipo_iva: 'Exento',
      id_uso_cfdi_predeterminado: 'I01',
      id_forma_pago_predeterminada: '03 · Transferencia',
      id_metodo_pago_predeterminado: 'PUE',
      limite_credito: 60000,
      dias_credito: 20,
      observaciones: 'Facturación electrónica pendiente de validación.',
    },
  ];

  constructor() {
    this.breadcrumb.setItems([
      { key: 'clients', label: 'Clientes', route: '/app/clients', disabled: true },
    ]);
  }

  openDrawer(): void {
    this.drawerVisible.set(true);
  }

  clearSelection(): void {
    this.selectedClients.set([]);
  }
}
