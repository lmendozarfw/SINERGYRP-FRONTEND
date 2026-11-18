import { computed, Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

export interface BreadcrumbItem {
  key?: string;
  label: string;
  route?: string | unknown[];
  url?: string;
  icon?: string;
  disabled?: boolean;
  visible?: boolean;
  command?: () => void;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly state = signal<BreadcrumbItem[]>([]);
  private readonly homeState = signal<BreadcrumbItem | null>({
    key: 'home',
    label: '',
    route: '/app/configuration',
  });

  readonly items = this.state.asReadonly();
  readonly home = this.homeState.asReadonly();

  private readonly visibleItems = computed(() =>
    this.state().filter((item) => item.visible !== false),
  );

  readonly menuItems = computed<MenuItem[]>(() =>
    this.visibleItems().map((item) => this.toMenuItem(item)),
  );

  readonly homeMenuItem = computed<MenuItem | undefined>(() => {
    const home = this.home();
    return home && home.visible !== false ? this.toMenuItem(home) : undefined;
  });

  setItems(items: readonly BreadcrumbItem[]): void {
    this.state.set(items.map((item) => this.normalize(item)));
  }

  addItem(item: BreadcrumbItem): void {
    this.state.update((items) => [...items, this.normalize(item)]);
  }

  removeItem(key: string): void {
    this.state.update((items) => items.filter((item) => this.keyOf(item) !== key));
  }

  updateItem(key: string, partial: Partial<BreadcrumbItem>): void {
    this.state.update((items) =>
      items.map((item) =>
        this.keyOf(item) === key ? this.normalize({ ...item, ...partial }) : item,
      ),
    );
  }

  setVisible(key: string, visible: boolean): void {
    this.updateItem(key, { visible });
  }

  setDisabled(key: string, disabled: boolean): void {
    this.updateItem(key, { disabled });
  }

  lock(key: string): void {
    this.setDisabled(key, true);
  }

  unlock(key: string): void {
    this.setDisabled(key, false);
  }

  clear(): void {
    this.state.set([]);
  }

  setHome(item: BreadcrumbItem | null): void {
    this.homeState.set(item ? this.normalize(item) : null);
  }

  private toMenuItem(item: BreadcrumbItem): MenuItem {
    const disabled = item.disabled === true;
    return {
      label: item.label,
      icon: item.icon,
      disabled,
      ...(disabled
        ? {}
        : {
            routerLink: item.route,
            url: item.url,
            command: item.command ? () => item.command?.() : undefined,
          }),
    };
  }

  private keyOf(item: BreadcrumbItem): string {
    return item.key ?? item.label;
  }

  private normalize(item: BreadcrumbItem): BreadcrumbItem {
    return { ...item, key: this.keyOf(item) };
  }
}
