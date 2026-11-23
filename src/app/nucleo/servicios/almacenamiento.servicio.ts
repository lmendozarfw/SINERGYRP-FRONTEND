import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoLocalServicio {
  establecer<T>(llave: string, valor: T): void {
    localStorage.setItem(llave, JSON.stringify(valor));
  }

  obtener<T>(llave: string): T | null {
    const valor = localStorage.getItem(llave);

    if (valor === null) {
      return null;
    }

    try {
      return JSON.parse(valor) as T;
    } catch {
      return null;
    }
  }

  remover(llave: string): void {
    localStorage.removeItem(llave);
  }

  limpiar(): void {
    localStorage.clear();
  }

  tiene(llave: string): boolean {
    return localStorage.getItem(llave) !== null;
  }
}
