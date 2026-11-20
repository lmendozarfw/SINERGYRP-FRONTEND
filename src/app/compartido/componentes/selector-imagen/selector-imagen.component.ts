
import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface ArchivoSeleccionado {
    id: number;
    archivo: File;
    vistaPrevia: string | null;
}

@Component({
    selector: 'app-selector-imagen',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule
    ],
    templateUrl: './selector-imagen.component.html',
    styleUrl: './selector-imagen.component.scss'
})
export class SelectorImagenComponent implements OnDestroy {

    // -----------------------------------------
    // Configuración
    // -----------------------------------------

    @Input() textoPrincipal = 'Arrastra una imagen aquí';

    @Input() textoSecundario = 'o selecciona un archivo';

    @Input() textoBoton = 'Seleccionar imagen';

    // Textos opcionales cuando multiple = true.
    // Si no se definen, se reutilizan los textos principales.
    @Input() textoPrincipalMultiple = '';

    @Input() textoSecundarioMultiple = '';

    @Input() textoBotonMultiple = '';

    @Input() textoBotonAgregar = 'Agregar imágenes';

    @Input() formatosPermitidos = 'image/png,image/jpeg,image/webp';

    @Input() tamanioMaximoMB = 5;

    @Input() deshabilitado = false;

    @Input() mostrarVistaPrevia = true;

    // Permite seleccionar y administrar varias imágenes.
    @Input() multiple = false;

    // Cantidad máxima de imágenes. 0 = sin límite.
    @Input() maximoArchivos = 0;

    // -----------------------------------------
    // Eventos
    // -----------------------------------------

    @Output() imagenSeleccionada = new EventEmitter<File>();

    @Output() imagenesSeleccionadas = new EventEmitter<File[]>();

    @Output() imagenEliminada = new EventEmitter<void>();

    @Output() archivoEliminado = new EventEmitter<File>();

    // -----------------------------------------
    // Estado del componente
    // -----------------------------------------

    archivos: ArchivoSeleccionado[] = [];

    arrastrando = false;

    mensajeError: string | null = null;

    private proximoId = 0;

    // Compatibilidad con el modo de una sola imagen.
    get archivoSeleccionado(): File | null {
        return this.archivos[0]?.archivo ?? null;
    }

    get vistaPrevia(): string | null {
        return this.archivos[0]?.vistaPrevia ?? null;
    }

    get alcanzoMaximo(): boolean {
        return (
            this.multiple &&
            this.maximoArchivos > 0 &&
            this.archivos.length >= this.maximoArchivos
        );
    }

    get textoVacioPrincipal(): string {
        return this.multiple
            ? this.textoPrincipalMultiple || this.textoPrincipal
            : this.textoPrincipal;
    }

    get textoVacioSecundario(): string {
        return this.multiple
            ? this.textoSecundarioMultiple || this.textoSecundario
            : this.textoSecundario;
    }

    get textoVacioBoton(): string {
        return this.multiple
            ? this.textoBotonMultiple || this.textoBoton
            : this.textoBoton;
    }

    // -----------------------------------------
    // Selección de archivos
    // -----------------------------------------

    abrirSelector(input: HTMLInputElement): void {

        if (this.deshabilitado || this.alcanzoMaximo) {
            return;
        }

        input.click();
    }

    seleccionarArchivo(evento: Event): void {

        const input = evento.target as HTMLInputElement;

        const archivos = Array.from(input.files ?? []);

        if (archivos.length) {
            this.procesarArchivos(archivos);
        }

        // Permite volver a seleccionar los mismos archivos.
        input.value = '';
    }

    // -----------------------------------------
    // Drag & Drop
    // -----------------------------------------

    alArrastrarSobre(evento: DragEvent): void {

        evento.preventDefault();

        if (this.deshabilitado || this.alcanzoMaximo) {
            return;
        }

        this.arrastrando = true;
    }

    alSalirDelArea(evento: DragEvent): void {

        evento.preventDefault();

        this.arrastrando = false;
    }

    alSoltarArchivo(evento: DragEvent): void {

        evento.preventDefault();

        this.arrastrando = false;

        if (this.deshabilitado) {
            return;
        }

        const archivos = Array.from(evento.dataTransfer?.files ?? []);

        if (archivos.length) {
            this.procesarArchivos(archivos);
        }
    }

    // -----------------------------------------
    // Procesamiento y validación
    // -----------------------------------------

    private procesarArchivos(archivos: File[]): void {

        this.mensajeError = null;

        const candidatos = this.multiple
            ? archivos
            : archivos.slice(0, 1);

        const validos: File[] = [];

        for (const archivo of candidatos) {

            const error = this.validarArchivo(archivo);

            if (error) {

                if (!this.mensajeError) {
                    this.mensajeError = error;
                }

                continue;
            }

            if (this.yaSeleccionado(archivo)) {
                continue;
            }

            validos.push(archivo);
        }

        if (!validos.length) {
            return;
        }

        let porAgregar = validos;

        if (this.multiple && this.maximoArchivos > 0) {

            const disponibles = Math.max(
                0,
                this.maximoArchivos - this.archivos.length
            );

            porAgregar = validos.slice(0, disponibles);

            if (porAgregar.length < validos.length) {
                this.mensajeError =
                    `Puedes seleccionar hasta ${this.maximoArchivos} imágenes.`;
            }
        }

        if (!porAgregar.length) {
            return;
        }

        if (!this.multiple) {
            this.limpiarArchivos();
        }

        for (const archivo of porAgregar) {

            this.archivos.push({
                id: this.proximoId++,
                archivo,
                vistaPrevia: this.mostrarVistaPrevia
                    ? URL.createObjectURL(archivo)
                    : null
            });

            this.imagenSeleccionada.emit(archivo);
        }

        this.emitirSeleccion();
    }

    private validarArchivo(archivo: File): string | null {

        if (!this.esFormatoValido(archivo)) {
            return 'El formato de imagen no está permitido.';
        }

        const tamanioMaximoBytes =
            this.tamanioMaximoMB * 1024 * 1024;

        if (archivo.size > tamanioMaximoBytes) {
            return `La imagen no puede superar ${this.tamanioMaximoMB} MB.`;
        }

        return null;
    }

    private esFormatoValido(archivo: File): boolean {

        const formatos = this.formatosPermitidos
            .split(',')
            .map(formato => formato.trim());

        return formatos.includes(archivo.type);
    }

    private yaSeleccionado(archivo: File): boolean {

        return this.archivos.some(
            item =>
                item.archivo.name === archivo.name &&
                item.archivo.size === archivo.size &&
                item.archivo.lastModified === archivo.lastModified
        );
    }

    // -----------------------------------------
    // Eliminar imágenes
    // -----------------------------------------

    eliminarArchivo(item: ArchivoSeleccionado): void {

        this.liberarVistaPrevia(item);

        this.archivos = this.archivos.filter(
            archivo => archivo.id !== item.id
        );

        this.mensajeError = null;

        this.archivoEliminado.emit(item.archivo);
        this.imagenEliminada.emit();

        this.emitirSeleccion();
    }

    eliminarImagen(): void {

        this.limpiarArchivos();

        this.mensajeError = null;

        this.imagenEliminada.emit();

        this.emitirSeleccion();
    }

    private emitirSeleccion(): void {

        this.imagenesSeleccionadas.emit(
            this.archivos.map(item => item.archivo)
        );
    }

    // -----------------------------------------
    // Liberación de recursos
    // -----------------------------------------

    private limpiarArchivos(): void {

        for (const item of this.archivos) {
            this.liberarVistaPrevia(item);
        }

        this.archivos = [];
    }

    private liberarVistaPrevia(item: ArchivoSeleccionado): void {

        if (item.vistaPrevia) {

            URL.revokeObjectURL(item.vistaPrevia);

            item.vistaPrevia = null;
        }
    }

    ngOnDestroy(): void {

        this.limpiarArchivos();
    }
}
