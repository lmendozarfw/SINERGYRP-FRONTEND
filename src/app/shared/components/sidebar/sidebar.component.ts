import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { PIcon } from '@primeicons/angular';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  badge?: string;
  children?: NavItem[];
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
  host: { class: 'block h-full' },
  imports: [Menu, PIcon],
  template: `
    <div class="flex h-full w-full flex-col border-r border-[var(--ds-navy-line)] bg-navy-950 text-white">
      <div class="flex items-center gap-3 border-b border-[var(--ds-navy-line)] py-6"
        [class.px-4]="!isCollapsed()" [class.px-2]="isCollapsed()"
        [class.justify-center]="isCollapsed()">
        <img
          src="assets/imagenes/isotipo-sinergy.png"
          alt="Sinergy"
          class="size-8 shrink-0 object-contain"
        />

        @if (!isCollapsed()) {
          <button
            type="button"
            class="flex min-w-0 flex-1 items-center gap-3 border-0 bg-transparent p-0 text-left text-inherit cursor-pointer focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none"
            (click)="workspaceMenu.toggle($event)"
          >
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold text-white">{{ selectedWorkspace() }}</span>
              <span class="block truncate text-xs leading-[18px] text-[var(--ds-navy-muted)]">{{
                selectedWorkspaceItem().detail
              }}</span>
            </span>
            <svg pIcon="chevron-down" [size]="14" class="ml-auto shrink-0"></svg>
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
                  <svg pIcon="check" [size]="16" class="ds-menu-item__check"></svg>
                }
              </button>
            </ng-template>
          </p-menu>
        }
      </div>

      @if (!isCollapsed()) {
        <p class="px-4 pt-6 pb-2 text-xs font-semibold leading-[18px] tracking-[0.08em] text-[var(--ds-navy-muted)] uppercase">Principal</p>
      } @else {
        <div class="h-4"></div>
      }

      <nav class="flex flex-col gap-1 px-3" aria-label="Navegación principal">
        @for (item of primaryItems; track item.label) {
          @if (item.children?.length) {
            <button
              type="button"
              class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]"
              [class.px-3]="!isCollapsed()" [class.px-0]="isCollapsed()"
              [class.justify-center]="isCollapsed()"
              [attr.data-active]="isItemActive(item) ? 'true' : null"
              [attr.aria-expanded]="isSubmenuOpen(item.label)"
              [attr.title]="item.label"
              (click)="toggleSubmenu(item.label)"
            >
              <svg [pIcon]="item.icon" [size]="16" class="shrink-0"></svg>
              @if (!isCollapsed()) {
                <span class="truncate">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-[rgba(255,255,255,0.14)] px-1.5 text-xs leading-[18px] text-white">{{ item.badge }}</span>
                }
                <svg pIcon="chevron-down" [size]="12" class="ml-auto shrink-0 transition-transform" [class.rotate-180]="isSubmenuOpen(item.label)"></svg>
              }
            </button>

            @if (!isCollapsed() && isSubmenuOpen(item.label)) {
              <div class="ml-9 flex flex-col gap-0.5 border-l border-[var(--ds-navy-line)] pl-3">
                @for (child of item.children; track child.label) {
                  <button
                    type="button"
                    class="flex h-9 w-full items-center gap-2 rounded-md border-0 bg-transparent px-3 text-left text-xs font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]"
                    [attr.data-active]="activeItem() === child.label ? 'true' : null"
                    [attr.aria-current]="activeItem() === child.label ? 'page' : null"
                    [attr.title]="child.label"
                    (click)="open(child)"
                  >
                    <svg [pIcon]="child.icon" [size]="14" class="shrink-0"></svg>
                    <span class="truncate">{{ child.label }}</span>
                  </button>
                }
              </div>
            }
          } @else {
            <button
              type="button"
              class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]"
              [class.px-3]="!isCollapsed()" [class.px-0]="isCollapsed()"
              [class.justify-center]="isCollapsed()"
              [attr.data-active]="activeItem() === item.label ? 'true' : null"
              [attr.aria-current]="activeItem() === item.label ? 'page' : null"
              [attr.title]="item.label"
              (click)="open(item)"
            >
              <svg [pIcon]="item.icon" [size]="16" class="shrink-0"></svg>
              @if (!isCollapsed()) {
                <span class="truncate">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-[rgba(255,255,255,0.14)] px-1.5 text-xs leading-[18px] text-white">{{ item.badge }}</span>
                }
              }
            </button>
          }
        }
      </nav>

      <div class="mx-3 my-4 h-px bg-[var(--ds-navy-line)]"></div>

      @if (!isCollapsed()) {
        <p class="px-4 pt-6 pb-2 text-xs font-semibold leading-[18px] tracking-[0.08em] text-[var(--ds-navy-muted)] uppercase">Configuración</p>
      }

      <nav class="flex flex-col gap-1 px-3" aria-label="Configuración">
        @for (item of secondaryItems; track item.label) {
          <button
            type="button"
            class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent text-left text-sm font-medium text-[var(--ds-navy-muted)] transition-colors hover:bg-[var(--ds-navy-hover)] hover:text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-white data-[active=true]:hover:bg-[var(--ds-primary-hover)]"
            [class.px-3]="!isCollapsed()" [class.px-0]="isCollapsed()"
            [class.justify-center]="isCollapsed()"
            [attr.data-active]="activeItem() === item.label ? 'true' : null"
            [attr.aria-current]="activeItem() === item.label ? 'page' : null"
            [attr.title]="item.label"
            (click)="open(item)"
          >
            @switch (item.icon) {
              @case ('cog') {
                <svg pIcon="cog" [size]="16" class="shrink-0"></svg>
              }
              @default {
                <svg pIcon="question-circle" [size]="16" class="shrink-0"></svg>
              }
            }
            @if (!isCollapsed()) {
              <span class="truncate">{{ item.label }}</span>
            }
          </button>
        }
      </nav>

      <div class="mt-auto border-t border-[var(--ds-navy-line)] px-4 py-4 text-xs leading-[18px] text-[var(--ds-navy-muted)]">
        <button type="button" class="group flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-white focus-visible:shadow-[var(--ds-focus-shadow)] focus-visible:outline-none" (click)="userMenu.toggle($event)">
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white"
          >
            LM
          </span>
          @if (!isCollapsed()) {
            <span class="min-w-0">
              <span class="block truncate text-white">Luis Mendoza</span>
              <span class="block truncate text-[var(--ds-navy-muted)] group-hover:text-white">Empleado · #5366</span>
            </span>
            <svg pIcon="ellipsis-v" [size]="16" class="ml-auto shrink-0"></svg>
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
                    <svg pIcon="user" [size]="16"></svg>
                  }
                  @case ('settings') {
                    <svg pIcon="cog" [size]="16"></svg>
                  }
                  @case ('help') {
                    <svg pIcon="question-circle" [size]="16"></svg>
                  }
                  @default {
                    <svg pIcon="sign-out" [size]="16"></svg>
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
})
export class SidebarComponent {
  readonly mobile = input(false);
  readonly collapsed = model(false);
  readonly navigate = output<void>();

  readonly isCollapsed = computed(() => this.collapsed() && !this.mobile());
  readonly activeItem = signal('Inicio');
  readonly selectedWorkspace = signal('SINERGYERP');
  readonly expandedItems = signal<ReadonlySet<string>>(new Set<string>());

  readonly primaryItems: NavItem[] = [
    { label: 'Inicio', icon: 'home', route: '/app/configuration' },
    {
      label: 'Tesoreria',
      icon: 'dollar',
      children: [
        { label: 'Cuentas por cobrar', icon: 'wallet', route: '/app/configuration' },
        { label: 'Cuentas por pagar', icon: 'credit-card', route: '/app/configuration' },
        { label: 'Clientes', icon: 'users', route: '/app/clients' },
      ],
    },
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

  isSubmenuOpen(label: string): boolean {
    return this.expandedItems().has(label);
  }

  isItemActive(item: NavItem): boolean {
    return (
      this.activeItem() === item.label ||
      !!item.children?.some((child) => child.label === this.activeItem())
    );
  }

  toggleSubmenu(label: string): void {
    const next = new Set(this.expandedItems());
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }
    this.expandedItems.set(next);
  }

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
