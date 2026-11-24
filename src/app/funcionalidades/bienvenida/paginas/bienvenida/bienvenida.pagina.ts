import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONOCER_MENU } from '@compartido/servicios/recorrido/ejemplos/conocer-menu';
import { RecorridoServicio } from '@compartido/servicios/recorrido/recorrido.servicio';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';

interface IAccesoRapido {
  titulo: string;
  descripcion: string;
  icono: string;
  ruta: string;
  tono: string;
}

interface IPasoInicio {
  id: string;
  titulo: string;
  descripcion: string;
  ruta?: string;
}

interface IConsejo {
  titulo: string;
  texto: string;
}

const CLAVE_PROGRESO = 'sinergyrp:bienvenida:pasos';

@Component({
  selector: 'app-bienvenida-pagina',
  imports: [RouterLink, ButtonDirective, PIcon],
  templateUrl: './bienvenida.pagina.html',
  styleUrl: './bienvenida.pagina.scss',
})
export class BienvenidaPagina {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly recorridoServicio = inject(RecorridoServicio);

  readonly saludo = this.calcularSaludo();
  readonly fecha = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  readonly accesos: IAccesoRapido[] = [
    {
      titulo: 'Clientes',
      descripcion: 'Consulta y da mantenimiento a tu cartera.',
      icono: 'users',
      ruta: '/app/clientes',
      tono: 'bg-ds-primary-soft text-ds-primary',
    },
    {
      titulo: 'Nuevo producto',
      descripcion: 'Crea una ficha con el asistente guiado.',
      icono: 'plus-circle',
      ruta: '/app/ingenieria-producto/nuevo-producto',
      tono: 'bg-ds-success-soft text-ds-success',
    },
    {
      titulo: 'Proveedores',
      descripcion: 'Organiza tus relaciones de compra.',
      icono: 'truck',
      ruta: '/app/proveedores',
      tono: 'bg-ds-warning-soft text-ds-warning',
    },
    {
      titulo: 'Catálogos',
      descripcion: 'Configura los valores base del sistema.',
      icono: 'list',
      ruta: '/app/tesoreria/catalogos',
      tono: 'bg-ds-action-100 text-ds-action-800',
    },
  ];

  readonly pasos: IPasoInicio[] = [
    {
      id: 'menu',
      titulo: 'Recorre el menú lateral',
      descripcion: 'Descubre los módulos y cómo se agrupan.',
    },
    {
      id: 'clientes',
      titulo: 'Consulta tus clientes',
      descripcion: 'Abre la lista y prueba los filtros.',
      ruta: '/app/clientes',
    },
    {
      id: 'proveedores',
      titulo: 'Consulta tus proveedores',
      descripcion: 'Abre la lista y prueba los filtros.',
      ruta: '/app/proveedores',
    },
    {
      id: 'producto',
      titulo: 'Registra un nuevo modelo',
      descripcion: 'El asistente te guía paso a paso.',
      ruta: '/app/ingenieria-producto/nuevo-producto',
    },
    {
      id: 'MRP',
      titulo: 'Producción',
      descripcion: 'Proyecta tu capacidad de producción.',
      ruta: '/app/clientes',
    },
  ];

  readonly consejos: IConsejo[] = [
    {
      titulo: 'Explora sin miedo',
      texto:
        'El menú lateral se colapsa para darte más espacio. En pantallas pequeñas se abre como un panel deslizable.',
    },
    {
      titulo: 'Siempre sabrás dónde estás',
      texto:
        'Las migas de pan aparecen arriba. Si necesitas volver, toca el ícono de inicio y regresas a esta pantalla.',
    },
    {
      titulo: 'Alta de productos guiada',
      texto:
        'El asistente de nuevo producto te acompaña en cinco pasos y valida la información antes de liberar la ficha.',
    },
    {
      titulo: 'Busca, filtra y avanza',
      texto:
        'En Clientes puedes combinar búsqueda, filtros y selección múltiple sin salir de la tabla.',
    },
    {
      titulo: 'Un espacio, muchas áreas',
      texto:
        'Ventas, producción, ingeniería, inventarios y tesorería conviven en el mismo espacio corporativo.',
    },
  ];

  readonly pasosCompletados = signal<ReadonlySet<string>>(this.leerProgreso());
  readonly progreso = computed(() =>
    Math.round((this.pasosCompletados().size / this.pasos.length) * 100),
  );
  readonly indiceConsejo = signal(0);
  readonly consejoActual = computed(() => this.consejos[this.indiceConsejo()]);

  constructor() {
    this.breadcrumb.limpiar();
  }

  pasoCompletado(id: string): boolean {
    return this.pasosCompletados().has(id);
  }

  alternarPaso(id: string): void {
    if (id === "menu") {
      this.recorridoServicio.iniciar(CONOCER_MENU);
    }
  }

  siguienteConsejo(): void {
    this.indiceConsejo.update((indice) => (indice + 1) % this.consejos.length);
  }

  private calcularSaludo(): string {
    const hora = new Date().getHours();
    let mensaje = "";
    if (hora < 12) {
      mensaje = 'Buenos días';
    } else if (hora < 19) {
      mensaje = 'Buenas tardes';
    } else {
      mensaje = 'Buenas noches';
    }
    return `${mensaje}, Luis Angel.`;
  }

  private leerProgreso(): ReadonlySet<string> {
    if (typeof localStorage === 'undefined') return new Set<string>();
    try {
      const guardado = localStorage.getItem(CLAVE_PROGRESO);
      if (!guardado) return new Set<string>();
      const ids = JSON.parse(guardado);
      return new Set<string>(Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : []);
    } catch {
      return new Set<string>();
    }
  }

  private guardarProgreso(ids: ReadonlySet<string>): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(CLAVE_PROGRESO, JSON.stringify([...ids]));
    } catch {
      return;
    }
  }
}
