export interface Cliente {
  nombre_razon_social: string;
  nombre_comercial: string;
  tipo_persona: string;
  rfc: string;
  id_regimen_fiscal: string;
  id_tipo_iva: string;
  id_uso_cfdi_predeterminado: string;
  id_forma_pago_predeterminada: string;
  id_metodo_pago_predeterminado: string;
  limite_credito: number;
  dias_credito: number;
  observaciones: string;
}
