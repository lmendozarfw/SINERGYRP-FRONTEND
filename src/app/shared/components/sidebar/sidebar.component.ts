import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import {
  Box,
  ChartBar,
  Check,
  ChevronDown,
  Cog,
  EllipsisV,
  Home,
  Inbox,
  QuestionCircle,
  Search,
  SignOut,
  User,
  Users,
  Wrench,
} from '@primeicons/angular';

interface NavItem {
  label: string;
  icon:
    | 'home'
    | 'box'
    | 'users'
    | 'inbox'
    | 'chart-bar'
    | 'search'
    | 'cog'
    | 'question-circle'
    | 'wrench';
  route?: string;
  badge?: string;
}

interface WorkspaceItem extends MenuItem {
  initial: string;
  detail: string;
}

interface UserActionItem extends MenuItem {
  key: 'profile' | 'settings' | 'help' | 'logout';
  danger?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    Menu,
    Box,
    ChartBar,
    Check,
    ChevronDown,
    Cog,
    EllipsisV,
    Home,
    Inbox,
    QuestionCircle,
    Search,
    SignOut,
    User,
    Users,
    Wrench,
  ],
  template: `
    <div class="ds-sidebar flex h-full flex-col" [class.ds-sidebar--collapsed]="isCollapsed()">
      <div class="ds-sidebar__header">
        <img
          src="assets/imagenes/isotipo-sinergy.png"
          alt="Sinergy"
          class="size-8 shrink-0 object-contain"
        />

        @if (!isCollapsed()) {
          <button
            type="button"
            class="ds-sidebar__workspace"
            (click)="workspaceMenu.toggle($event)"
          >
            <span class="min-w-0">
              <span class="ds-sidebar__brand block truncate">{{ selectedWorkspace() }}</span>
              <span class="ds-sidebar__hint block truncate">{{
                selectedWorkspaceItem().detail
              }}</span>
            </span>
            <svg data-p-icon="chevron-down" [size]="14" class="ml-auto shrink-0"></svg>
          </button>
          <p-menu
            #workspaceMenu
            class="ds-menu"
            [model]="workspaceItems"
            [popup]="true"
            appendTo="body"
          >
            <ng-template #item let-item>
              <button
                type="button"
                class="ds-menu-item"
                [class.ds-menu-item--active]="selectedWorkspace() === item.label"
                (click)="selectWorkspace($any(item), workspaceMenu)"
              >
                <span class="ds-menu-avatar">{{ $any(item).initial }}</span>
                <span class="ds-menu-item__content">
                  <span class="ds-menu-item__title">{{ item.label }}</span>
                  <span class="ds-menu-item__subtitle">{{ $any(item).detail }}</span>
                </span>
                @if (selectedWorkspace() === item.label) {
                  <svg data-p-icon="check" [size]="16" class="ds-menu-item__check"></svg>
                }
              </button>
            </ng-template>
          </p-menu>
        }
      </div>

      @if (!isCollapsed()) {
        <p class="ds-sidebar__section">Principal</p>
      } @else {
        <div class="h-4"></div>
      }

      <nav class="ds-sidebar__nav" aria-label="Navegación principal">
        @for (item of primaryItems; track item.label) {
          <button
            type="button"
            class="ds-sidebar__item"
            [class.ds-sidebar__item--active]="activeItem() === item.label"
            [attr.aria-current]="activeItem() === item.label ? 'page' : null"
            [attr.title]="item.label"
            (click)="open(item)"
          >
            @switch (item.icon) {
              @case ('home') {
                <svg data-p-icon="home" [size]="16" class="shrink-0"></svg>
              }
              @case ('box') {
                <svg data-p-icon="box" [size]="16" class="shrink-0"></svg>
              }
              @case ('users') {
                <svg data-p-icon="users" [size]="16" class="shrink-0"></svg>
              }
              @case ('inbox') {
                <svg data-p-icon="inbox" [size]="16" class="shrink-0"></svg>
              }
              @case ('chart-bar') {
                <svg data-p-icon="chart-bar" [size]="16" class="shrink-0"></svg>
              }
              @case ('search') {
                <svg data-p-icon="search" [size]="16" class="shrink-0"></svg>
              }
              @case ('wrench') {
                <svg data-p-icon="wrench" [size]="16" class="shrink-0"></svg>
              }
              @default {
                <svg data-p-icon="cog" [size]="16" class="shrink-0"></svg>
              }
            }
            @if (!isCollapsed()) {
              <span class="truncate">{{ item.label }}</span>
              @if (item.badge) {
                <span class="ds-sidebar__badge">{{ item.badge }}</span>
              }
            }
          </button>
        }
      </nav>

      <div class="ds-sidebar__divider"></div>

      @if (!isCollapsed()) {
        <p class="ds-sidebar__section">Configuración</p>
      }

      <nav class="ds-sidebar__nav" aria-label="Configuración">
        @for (item of secondaryItems; track item.label) {
          <button
            type="button"
            class="ds-sidebar__item"
            [class.ds-sidebar__item--active]="activeItem() === item.label"
            [attr.aria-current]="activeItem() === item.label ? 'page' : null"
            [attr.title]="item.label"
            (click)="open(item)"
          >
            @switch (item.icon) {
              @case ('cog') {
                <svg data-p-icon="cog" [size]="16" class="shrink-0"></svg>
              }
              @default {
                <svg data-p-icon="question-circle" [size]="16" class="shrink-0"></svg>
              }
            }
            @if (!isCollapsed()) {
              <span class="truncate">{{ item.label }}</span>
            }
          </button>
        }
      </nav>

      <div class="ds-sidebar__footer mt-auto">
        <button type="button" class="ds-sidebar__user" (click)="userMenu.toggle($event)">
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white"
          >
            LM
          </span>
          @if (!isCollapsed()) {
            <span class="min-w-0">
              <span class="block truncate text-white">Luis Mendoza</span>
              <span class="ds-sidebar__hint block truncate">Empleado · #5366</span>
            </span>
            <svg data-p-icon="ellipsis-v" [size]="16" class="ml-auto shrink-0"></svg>
          }
        </button>
        <p-menu
          #userMenu
          class="ds-menu ds-menu--user"
          [model]="userItems"
          [popup]="true"
          appendTo="body"
        >
          <ng-template #item let-item>
            <button
              type="button"
              class="ds-menu-item"
              [class.ds-menu-item--danger]="$any(item).danger"
              (click)="handleUserAction($any(item), userMenu)"
            >
              <span class="ds-menu-item__icon">
                @switch ($any(item).key) {
                  @case ('profile') {
                    <svg data-p-icon="user" [size]="16"></svg>
                  }
                  @case ('settings') {
                    <svg data-p-icon="cog" [size]="16"></svg>
                  }
                  @case ('help') {
                    <svg data-p-icon="question-circle" [size]="16"></svg>
                  }
                  @default {
                    <svg data-p-icon="sign-out" [size]="16"></svg>
                  }
                }
              </span>
              <span class="ds-menu-item__title">{{ item.label }}</span>
            </button>
          </ng-template>
        </p-menu>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class SidebarComponent {
  readonly mobile = input(false);
  readonly collapsed = model(false);
  readonly navigate = output<void>();

  readonly isCollapsed = computed(() => this.collapsed() && !this.mobile());
  readonly activeItem = signal('Inicio');
  readonly selectedWorkspace = signal('SINERGYERP');

  readonly primaryItems: NavItem[] = [
    { label: 'Inicio', icon: 'home', route: '/app/configuration' },
    { label: 'Activos fijos', icon: 'box', route: '/app/configuration' },
    { label: 'Clientes', icon: 'users', route: '/app/clients' },
    {
      label: 'Ingeniería de producto',
      icon: 'wrench',
      route: '/app/product-engineering/new-product',
    },
    { label: 'Operaciones', icon: 'inbox', route: '/app/configuration', badge: '3' },
    { label: 'Reportes', icon: 'chart-bar', route: '/app/configuration' },
    { label: 'Búsquedas', icon: 'search', route: '/app/configuration' },
  ];

  readonly secondaryItems: NavItem[] = [
    { label: 'Configuración', icon: 'cog', route: '/app/configuration' },
    { label: 'Componentes', icon: 'question-circle', route: '/design-system' },
  ];

  readonly workspaceItems: WorkspaceItem[] = [
    { label: 'SINERGYERP', initial: 'S', detail: 'Nave 1-2-3 · Corporativo' },
    { label: 'Sucursal Norte', initial: 'SN', detail: 'Planta de producción norte' },
    { label: 'Sucursal Sur', initial: 'SS', detail: 'Planta de producción sur' },
    { label: 'Almacén Central', initial: 'AC', detail: 'Inventario y distribución' },
  ];

  readonly userItems: UserActionItem[] = [
    { label: 'Mi perfil', key: 'profile' },
    { label: 'Configuración', key: 'settings' },
    { label: 'Ayuda', key: 'help' },
    { label: 'Cerrar sesión', key: 'logout', danger: true },
  ];

  readonly selectedWorkspaceItem = computed(
    () =>
      this.workspaceItems.find((item) => item.label === this.selectedWorkspace()) ??
      this.workspaceItems[0],
  );

  private readonly router = inject(Router);

  open(item: NavItem): void {
    this.activeItem.set(item.label);
    if (item.route) {
      void this.router.navigateByUrl(item.route);
    }
    this.navigate.emit();
  }

  selectWorkspace(item: WorkspaceItem, menu: Menu): void {
    this.selectedWorkspace.set(item.label ?? '');
    menu.hide();
    this.navigate.emit();
  }

  handleUserAction(item: UserActionItem, menu: Menu): void {
    menu.hide();
    this.navigate.emit();
    switch (item.key) {
      case 'profile':
      case 'settings':
        void this.router.navigateByUrl('/app/configuration');
        break;
      case 'help':
        void this.router.navigateByUrl('/design-system');
        break;
      case 'logout':
        void this.router.navigateByUrl('/auth/login');
        break;
    }
  }
}
