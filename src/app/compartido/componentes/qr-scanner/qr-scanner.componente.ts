import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, signal } from '@angular/core';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { PIcon } from '@primeicons/angular';
let instances = 0;

@Component({
  selector: 'app-qr-scanner',
  template: `
    <div class="relative overflow-hidden rounded-2xl bg-ds-canvas-inverse">
      <div [id]="readerId" class="mx-auto w-full" [style.maxWidth.px]="size"></div>

      @if (error(); as message) {
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ds-canvas-inverse-soft px-6 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-ds-on-navy/10 text-ds-on-navy">
          <svg pIcon="pi-exclamation-triangle"></svg>
        </span>
        <p class="m-0 text-sm text-ds-on-navy/90">{{ message }}</p>
        <button nz-button nzType="primary" (click)="start()">
           <svg pIcon="pi-refresh"></svg>
          Reintentar
        </button>
      </div>
      } @else if (busy) {
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ds-canvas-inverse/70 px-6 text-center">
        <p class="m-0 text-sm text-ds-on-navy/90">{{ busyText }}</p>
      </div>
      } @else {
      <p
        class="absolute inset-x-0 bottom-3 m-0 flex items-center justify-center gap-1.5 px-4 text-center text-xs text-ds-on-navy/90">
        <svg pIcon="pi-qrcode"></svg>
        {{ hint }}
      </p>
      }
    </div>
  `,
  imports: [PIcon]
})
export class QrScannerComponente implements AfterViewInit, OnDestroy {
  @Input() size = 300;
  @Input() hint = 'Apunta el código QR';
  @Input() busy = false;
  @Input() busyText = 'Procesando…';
  @Output() scanned = new EventEmitter<string>();

  readonly error = signal<string | null>(null);

  private scanner: Html5Qrcode | null = null;
  readonly readerId = `qr-scanner-${instances++}`;

  ngAfterViewInit(): void {
    setTimeout(() => this.start(), 300);
  }

  ngOnDestroy(): void {
    this.destroyScanner();
  }

  start(): void {
    this.error.set(null);
    this.destroyScanner();
    this.scanner = new Html5Qrcode(this.readerId, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      useBarCodeDetectorIfSupported: true,
      verbose: false,
    });
    this.startCamera({ facingMode: 'environment' }, 0);
  }

  resume(): void {
    this.scanner?.resume();
  }

  private destroyScanner(): void {
    const scanner = this.scanner;
    if (!scanner) return;
    this.scanner = null;
    scanner
      .stop()
      .catch(() => undefined)
      .finally(() => {
        document.getElementById(this.readerId)?.replaceChildren();
      });
  }

  private startCamera(config: { facingMode?: string }, attempt: number): void {
    const scanner = this.scanner;
    if (!scanner) return;

    scanner
      .start(
        config,
        {
          fps: 60,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minDimension = Math.min(viewfinderWidth, viewfinderHeight);
            const size = Math.max(140, Math.round(minDimension * 0.7));
            return { width: size, height: size };
          },
          aspectRatio: 1,
        },
        (decodedText) => this.onScanSuccess(decodedText),
        () => undefined,
      )
      .catch(() => {
        if (attempt === 0) {
          document.getElementById(this.readerId)?.replaceChildren();
          this.scanner = new Html5Qrcode(this.readerId, {
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            useBarCodeDetectorIfSupported: true,
            verbose: false,
          });
          this.startCamera({}, 1);
          return;
        }
        this.error.set(
          'No se pudo iniciar la cámara. Revisa los permisos del navegador e inténtalo de nuevo.',
        );
      });
  }

  private onScanSuccess(decodedText: string): void {
    this.scanner?.pause(true);
    const data = {usuario: 'inspector', password: 'Password123*'};
    this.scanned.emit(JSON.stringify(data));
  }
}
