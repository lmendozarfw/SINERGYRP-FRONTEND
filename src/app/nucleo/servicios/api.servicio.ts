import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@entornos/environment.prod';

function hacerParametrosHttp(parametros?: Record<string, string | number | boolean>): HttpParams {
  let parametrosHttp = new HttpParams();
  if (parametros) {
    Object.entries(parametros).forEach(([key, value]) => {
      parametrosHttp = parametrosHttp.set(key, String(value));
    });
  }
  return parametrosHttp;
}

@Injectable({
  providedIn: 'root',
})
export class ApiServicio {
  constructor(private http: HttpClient) {}

  obtenerTodos<TRespuesta>(
    endpoint: string,
    parametros?: Record<string, string | number | boolean>,
  ): Observable<TRespuesta[]> {
    return this.http.get<TRespuesta[]>(`${environment.apiUrl}/${endpoint}`, { params: hacerParametrosHttp(parametros) });
  }

  obtenerPorId<TRespuesta>(endpoint: string, id: number | string): Observable<TRespuesta> {
    return this.http.get<TRespuesta>(`${environment.apiUrl}/${endpoint}/${id}`);
  }

  obtener<TRespuesta>(
    endpoint: string,
    parametros?: Record<string, string | number | boolean>,
  ): Observable<TRespuesta> {
    return this.http.get<TRespuesta>(`${environment.apiUrl}/${endpoint}`, { params: hacerParametrosHttp(parametros) });
  }

  descargar(
    endpoint: string,
    parametros?: Record<string, string | number | boolean>,
  ): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/${endpoint}`, {
      params: hacerParametrosHttp(parametros),
      responseType: 'blob',
      observe: 'response',
    });
  }

  crear<TPeticion, TRespuesta>(endpoint: string, data: Partial<TPeticion>): Observable<TRespuesta> {
    return this.http.post<TRespuesta>(`${environment.apiUrl}/${endpoint}`, data);
  }

  post<TPeticion, TRespuesta>(endpoint: string, data: Partial<TPeticion>): Observable<TRespuesta> {
    return this.http.post<TRespuesta>(`${environment.apiUrl}/${endpoint}`, data);
  }

  actualizar<TPeticion, TRespuesta>(
    endpoint: string,
    id: number | string,
    informacion: Partial<TPeticion>,
  ): Observable<TRespuesta> {
    return this.http.put<TRespuesta>(`${environment.apiUrl}/${endpoint}/${id}`, informacion);
  }

  actualizarParcial<TRespuesta>(endpoint: string, data: unknown = {}): Observable<TRespuesta> {
    return this.http.patch<TRespuesta>(`${environment.apiUrl}/${endpoint}`, data);
  }

  eliminar<TRespuesta>(endpoint: string, id: number | string): Observable<TRespuesta> {
    return this.http.delete<TRespuesta>(`${environment.apiUrl}/${endpoint}/${id}`);
  }
}
