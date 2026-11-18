import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Filter, Plus, Search, Eye, Pencil, Trash } from '@primeicons/angular';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SortIcon, Table, TableHeaderCheckbox, TableCheckbox } from 'primeng/table';
import { BulkActionsBarComponent } from '../../../../shared/components/bulk-actions-bar/bulk-actions-bar.component';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Tag } from 'primeng/tag';
import { Drawer } from 'primeng/drawer';
import { FormLabelComponent } from '../../../../shared/components/form-label/form-label.component';

@Component({
  selector: 'app-combinaciones',
  imports: [Filter, Plus, Search, IconField, InputIcon, InputText, Select, DecimalPipe, Eye, Pencil, Trash, SortIcon, Table, TableHeaderCheckbox, BulkActionsBarComponent, TableCheckbox, Tag, Drawer, FormLabelComponent],
  templateUrl: './combinaciones.component.html',
})
export class CombinacionesComponent {
  private readonly breadcrumb = inject(BreadcrumbService);
  readonly drawerVisible = signal(false);
  readonly selectedClients = signal<any[]>([]);
  readonly tipoPersonaOptions = [
    { label: 'Física', value: 'Física' },
    { label: 'Moral', value: 'Moral' },
  ];

  readonly regimenOptions = [
    { label: '601 · General de Ley Personas Morales', value: '601 · General' },
    { label: '612 · Personas Físicas con Actividades Empresariales', value: '612 · PFAE' },
    { label: '616 · Sin obligaciones fiscales', value: '616 · Sin obligaciones' },
  ];

  constructor() {
    this.breadcrumb.setItems([
      { key: 'clients', label: 'Clientes', route: '/app/clients', disabled: true },
    ]);
  }

  clearSelection(): void {
    this.selectedClients.set([]);
  }
}
