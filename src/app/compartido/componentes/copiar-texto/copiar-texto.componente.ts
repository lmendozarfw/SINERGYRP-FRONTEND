import { ChangeDetectionStrategy, Component, computed, input, OnDestroy, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';

type VarianteCopiarTexto = 'mono' | 'nombre';

@Component({
  selector: 'app-copiar-texto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonDirective, PIcon],
  host: { class: 'inline-flex max-w-full align-middle' },
  template: `
    <button
      type="button"
      pButton
      fluid
      [pButtonUnstyled]="true"
      class="group inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-md border border-transparent bg-transparent px-1.5 py-1 text-left transition-colors hover:border-ds-primary-soft hover:bg-ds-primary-soft hover:text-ds-primary-strong focus-visible:shadow-ds-focus focus-visible:outline-none"
      [class]="claseTexto()"
      [attr.aria-label]="(copiado() ? 'Copiado: ' : 'Copiar ') + (etiqueta() || valor())"
      [title]="copiado() ? 'Copiado al portapapeles' : 'Copiar ' + (etiqueta() || valor())"
      (click)="copiar()"
    >
      <span
        class="truncate group-hover:underline group-hover:decoration-dotted group-hover:underline-offset-2"
      >
        {{ textoVisible() }}
      </span>
      <svg
        [pIcon]="copiado() ? 'check' : 'copy'"
        [size]="tamanoIcono()"
        class="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 max-sm:opacity-100"
        [class.text-ds-success]="copiado()"
        aria-hidden="true"
      ></svg>
      <span class="sr-only" aria-live="polite">
        {{ copiado() ? 'Copiado al portapapeles' : '' }}
      </span>
    </button>
  `,
})
export class CopiarTextoComponente implements OnDestroy {
  readonly valor = input.required<string>();
  readonly etiqueta = input<string>('');
  readonly texto = input<string>();
  readonly variante = input<VarianteCopiarTexto>('mono');
  readonly copiado = signal(false);
  readonly textoVisible = computed(() => this.texto() ?? this.valor());
  readonly claseTexto = computed(() =>
    this.variante() === 'nombre'
      ? '-ml-1.5 text-sm font-semibold leading-5 text-ds-ink'
      : 'font-mono text-xs leading-[18px] tracking-[0.03em] text-ds-muted',
  );
  readonly tamanoIcono = computed(() => (this.variante() === 'nombre' ? 14 : 13));

  private temporizador?: ReturnType<typeof setTimeout>;

  async copiar(): Promise<void> {
    const valor = this.valor();
    if (!valor) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(valor);
      } else {
        this.copiarConRespaldo(valor);
      }
    } catch {
      this.copiarConRespaldo(valor);
    }

    this.marcarCopiado();
  }

  ngOnDestroy(): void {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
  }

  private copiarConRespaldo(valor: string): void {
    const area = document.createElement('textarea');
    area.value = valor;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  private marcarCopiado(): void {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    this.copiado.set(true);
    this.temporizador = setTimeout(() => this.copiado.set(false), 1600);
  }
}
