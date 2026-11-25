import { Component, computed, input } from "@angular/core";
import { PIcon } from "@primeicons/angular";

interface IEstiloBanco { 
    fondo: string; 
    overlay: string; 
    texto: string; 
    muted: string; 
    chip: string; 
    etiqueta: string;
}

@Component({
    selector: 'app-tarjeta-credito',
    template: `
    <article class="relative overflow-hidden rounded-2xl p-5" [style.background]="estiloBanco().fondo" [style.color]="estiloBanco().texto">
      <div class="pointer-events-none absolute inset-0" [style.background]="estiloBanco().overlay"></div>
      <div class="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full border border-white/10"></div>
      <div class="relative flex items-start justify-between gap-3">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em]"
            [style.color]="estiloBanco().muted">Vista previa</p>
          <p class="mt-1 text-lg font-semibold tracking-tight">{{ banco() }}</p>
        </div>
        <span
          class="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
          {{ activo() ? 'Activa' : 'Inactiva' }}
        </span>
      </div>
      <div class="relative mt-6 flex items-center justify-between">
        <div class="h-9 w-11 rounded-md" [style.background]="estiloBanco().chip"></div>
        <svg pIcon="credit-card" [size]="28" class="opacity-80"></svg>
      </div>
      <p class="relative mt-6 font-mono text-[1.15rem] tracking-[0.18em]">{{ esSoloLectura() ? enmascaraNumeroCuenta() : formatoNumeroCuenta() }}</p>
      <div class="relative mt-6 flex items-end justify-between gap-4">
        <div class="min-w-0">
          <p class="text-[10px] uppercase tracking-[0.18em]" [style.color]="estiloBanco().muted">Titular</p>
          <p class="truncate text-sm font-medium">{{ titular() || 'Titular no especificado' }}</p>
        </div>
        <div class="text-right">
          <p class="text-[10px] uppercase tracking-[0.18em]"
            [style.color]="estiloBanco().muted">Moneda</p>
          <p class="text-sm font-semibold">{{ moneda() }}</p>
        </div>
      </div>
    </article>
    `,
    imports: [PIcon]
})
export class TarjetaCreditoComponente {
    banco = input.required<string>();
    titular = input.required<string>();
    numeroCuenta = input.required<string>();
    activo = input.required<boolean>();
    moneda = input.required<string>();
    esSoloLectura = input<boolean>(true);

    formatoNumeroCuenta = computed(() => {
        const numero = this.numeroCuenta();
        const limpio = String(numero ?? '').replace(/\D/g, '').slice(0, 16);
        if (!limpio) return '•••• •••• •••• ••••';
        const grupos = limpio.match(/.{1,4}/g)?.join(' ') ?? limpio;
        return grupos.padEnd(19, '•').replace(/•/g, '•');
    });

    enmascaraNumeroCuenta = computed(() => {
        const numero = this.numeroCuenta();
        const limpio = String(numero ?? '').replace(/\D/g, '').slice(0, 16);
        if (!limpio) return '•••• •••• •••• ••••';
        const ultimos = limpio.slice(-4).padStart(4, '•');
        const base = `•••• •••• •••• ${ultimos}`;
        return base;
    });

    private readonly estilosBanco: Record<string, IEstiloBanco> = {
        'BBVA': { fondo: 'linear-gradient(135deg, #004481 0%, #072146 55%, #1464A5 100%)', overlay: 'radial-gradient(circle at 85% 15%, rgba(255,255,255,.18), transparent 35%)', texto: '#FFFFFF', muted: 'rgba(255,255,255,.72)', chip: 'linear-gradient(135deg, #E6C97A, #B8943E)', etiqueta: 'BBVA' },
        'Citibanamex': { fondo: 'linear-gradient(135deg, #B3001B 0%, #7A0012 50%, #003DA5 120%)', overlay: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,.16), transparent 30%)', texto: '#FFFFFF', muted: 'rgba(255,255,255,.72)', chip: 'linear-gradient(135deg, #E8D48B, #B8962E)', etiqueta: 'Citibanamex' },
        'BanBajío': { fondo: 'linear-gradient(135deg, #6D1024 0%, #A6192E 45%, #3A0B14 100%)', overlay: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,.12), transparent 35%)', texto: '#FFFFFF', muted: 'rgba(255,255,255,.72)', chip: 'linear-gradient(135deg, #E7D3A8, #B8934A)', etiqueta: 'BanBajío' },
        'Otro': { fondo: 'linear-gradient(135deg, #18283E 0%, #101D30 55%, #2A3F5F 100%)', overlay: 'radial-gradient(circle at 85% 20%, rgba(37,99,235,.35), transparent 35%)', texto: '#FFFFFF', muted: 'rgba(255,255,255,.68)', chip: 'linear-gradient(135deg, #D7DEE8, #94A3B8)', etiqueta: 'Banco' }
    };

    estiloBanco = computed(() => {
        const banco = this.banco();
        return banco ?  this.estilosBanco[banco] : this.estilosBanco['Otro'];
    });
    constructor() {}
}