# SINERGYRP Design System
**ERP / Design System**  
**Stack:** Angular + PrimeNG + Tailwind CSS  
**Tema:** Claro (light theme)  
**Principio rector:** *Claridad para operaciones complejas. Una base esencial, consistente y preparada para crecer.*

---

## 1. Principios de diseño

1. **Claridad operativa** — Priorizar la legibilidad y la jerarquía visual en interfaces densas de datos.
2. **Consistencia en cada interacción** — Mismos patrones de color, tipografía, espaciado y componentes en todo el producto.
3. **Color con propósito** — Los neutros estructuran, el azul actúa, los colores semánticos informan.
4. **Estado siempre acompañado de texto** — Nunca usar solo color para comunicar éxito, aviso o error.
5. **Una acción primaria por contexto** — Evitar múltiples botones primarios compitiendo en la misma vista.

---

## 2. Color

### 2.1 Paleta estructural (Neutros + Acción)

| Token          | Hex       | Uso recomendado                          | Tailwind / CSS variable sugerida      |
|----------------|-----------|------------------------------------------|---------------------------------------|
| Navy 950       | `#101D30` | Navegación, sidebar, headers oscuros     | `navy-950` / `--color-navy-950`       |
| Blue 600       | `#2563EB` | Acción principal, links, selección activa| `blue-600` / `--color-blue-600`       |
| Slate 900      | `#18283E` | Texto principal                          | `slate-900` / `--color-slate-900`     |
| Slate 600      | `#536479` | Texto secundario, labels, ayuda          | `slate-600` / `--color-slate-600`     |
| Slate 200      | `#DCE3EC` | Bordes, divisores, fondos sutiles        | `slate-200` / `--color-slate-200`     |
| Slate 50       | `#F6F8FB` | Fondo de página / superficie base        | `slate-50` / `--color-slate-50`       |

### 2.2 Colores semánticos (siempre + texto)

| Estado  | Fondo aproximado     | Uso                                      | Nota importante                          |
|---------|----------------------|------------------------------------------|------------------------------------------|
| Éxito   | Verde muy claro      | Confirmaciones, cambios positivos        | Siempre acompañar de texto               |
| Aviso   | Amarillo / crema     | Advertencias, información importante     | Siempre acompañar de texto               |
| Error   | Rosa / rojo muy claro| Validaciones, errores de formulario      | Siempre acompañar de texto               |

> **Regla:** El estado semántico **nunca** se comunica únicamente con color. Debe incluir texto descriptivo.

### 2.3 Uso en Tailwind (recomendación)

```js
// tailwind.config.js (ejemplo de extensión)
colors: {
  navy: {
    950: '#101D30',
  },
  blue: {
    600: '#2563EB',
  },
  slate: {
    50:  '#F6F8FB',
    200: '#DCE3EC',
    600: '#536479',
    900: '#18283E',
  }
}
```

---

## 3. Tipografía

**Familia principal:** Inter  
**Características:** Precisión en cifras · Comodidad en lectura

### 3.1 Escala tipográfica

| Uso                        | Tamaño / Line-height | Peso          | Ejemplo de uso                     |
|----------------------------|----------------------|---------------|------------------------------------|
| Display (solo acceso)      | 48 px                | Semibold/Bold | Pantallas de login / onboarding    |
| Título principal           | 32 / 40              | Semibold      | "Operaciones bajo control"         |
| Título de sección          | 24 / 32              | Semibold      | "Visión general del negocio"       |
| Subtítulo / Card title     | 18 / 26              | Semibold      | "Resumen financiero"               |
| Cuerpo / Interfaz          | 14 / 22              | Regular       | Texto descriptivo, párrafos        |
| Label / Campo              | 14 / 20              | Medium        | Etiquetas de formularios           |
| Texto auxiliar / Meta      | 12 / 18              | Regular       | "Última actualización: hoy, 09:30" |

### 3.2 Reglas tipográficas

- **Interfaz base:** 14 px
- **Títulos:** 18–32 px
- **Display:** 48 px (restringido a pantallas de acceso)
- Evitar tamaños intermedios no definidos en la escala.
- Usar `font-medium` o `font-semibold` según la jerarquía; evitar `font-bold` excesivo.

---

## 4. Ritmo y forma (Espaciado + Radios)

### 4.1 Escala base de 4 px

```
4 · 8 · 12 · 16 · 24 · 32 · 48
```

Usar exclusivamente múltiplos de esta escala para márgenes, paddings y gaps.

### 4.2 Alturas de controles

| Variante     | Altura |
|--------------|--------|
| Compacto     | 36 px  |
| Estándar     | 44 px  |
| Amplio       | 48 px  |

**Botones y la mayoría de inputs usan 44 px** por defecto.

### 4.3 Border radius

| Elemento | Radio  |
|----------|--------|
| Botón    | 6 px   |
| Input    | 8 px   |
| Card     | 12 px  |

---

## 5. Componentes (PrimeNG + Tailwind)

Todos los componentes se basan en **PrimeNG** y se personalizan con Tailwind + CSS variables del design system.

### 5.1 Botones (`button con directiva pButton`)

- Tamaño por defecto: **44 px**. No se usa ninguna clase para definirlo.
- Solo se cambia el tamaño mediante el atributo `size` de PrimeNG:

| `size`            | Altura | Uso                                  |
|-------------------|--------|--------------------------------------|
| *(sin atributo)*  | 44 px  | Estándar (por defecto)               |
| `small`           | 36 px  | Compacto, tablas y acciones secundarias |
| `large`           | 48 px  | Amplio, acciones destacadas          |

- La variante se define con `variant`, no con clases:
  - *(sin `variant`)* → **Primario**, fondo `blue-600`, texto blanco
  - `variant="outlined"` → **Secundario**, borde + texto `blue-600`, fondo transparente
  - `variant="text"` → **Texto**, solo texto `blue-600`, sin borde ni fondo
  - `variant="link"` → **Enlace**, solo texto subrayable
- `severity` se reserva para significado semántico (por ejemplo, `severity="danger"`).
- `fluid` ocupa todo el ancho disponible.
- Los botones no llevan clases, salvo casos especiales de layout.
- Una sola acción primaria por contexto.

**Estados obligatorios a diseñar:**
- Normal
- Hover
- Focus visible (anillo de foco)
- Deshabilitado

```html
<!-- Ejemplo de uso -->
<button pButton>Guardar cambios</button>
<button pButton variant="outlined">Cancelar</button>
<button pButton variant="text">Ver detalle</button>
<button pButton variant="link">Ayuda</button>
<button pButton size="small">Añadir</button>
<button pButton size="large">Continuar</button>
<button pButton fluid>Iniciar sesión</button>
```

### 5.2 Inputs (`input con directiva pInput` / `input con directiva pInputPassword`)

- Etiqueta **persistente** (siempre visible).
- Texto de ayuda y mensajes de validación **debajo** del campo.
- Border radius: 8 px
- Estados:
  - Default
  - Focus (borde `blue-600`)
  - Error (borde rojo + mensaje en rojo)
  - Disabled (fondo y texto atenuados)

```html
<!-- Estructura recomendada -->
<div class="flex flex-col gap-1.5 mx-auto w-full max-w-xs">
            <label pLabel for="basic-inputtext">Project Name</label>
            <input pInputText id="basic-inputtext" [(ngModel)]="value" placeholder="e.g. My Project" />
            <small class="text-surface-500">Used as the display name across your workspace</small>
        </div>


        <div class="flex justify-center">
            <div class="max-w-2xs w-full">
                <div class="text-sm font-medium text-color mb-2">Create a password</div>
                <p-iconfield>
                    <p-inputicon>
                        <svg pIcon="lock"></svg>
                    </p-inputicon>
                    <input pInputPassword [(ngModel)]="value" [(mask)]="mask" [fluid]="true" />
                    <p-inputicon (click)="mask = !mask" style="cursor: pointer">
                        @if (mask) {
                            <svg pIcon="eye" [size]="16"></svg>
                        } @else {
                            <svg pIcon="eye-slash" [size]="16"></svg>
                        }
                    </p-inputicon>
                </p-iconfield>
                <div class="mt-4 flex items-center flex-wrap gap-1.5">
                    @for (rule of rules; track rule.label) {
                        <p-chip [class]="'py-0.75! pl-1.5! pr-2.5! text-xs! ' + (rule.test(value) ? 'text-green-600! dark:text-green-400!' : 'text-surface-500! dark:text-surface-400!')">
                            <span
                                [class]="
                                    'size-4 -ml-0.75 inline-flex items-center justify-center rounded-full ' +
                                    (rule.test(value) ? 'bg-green-600 text-surface-0 dark:bg-green-400 dark:text-surface-900' : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400')
                                "
                            >
                                @if (rule.test(value)) {
                                    <svg pIcon="check" [size]="12"></svg>
                                } @else {
                                    <svg pIcon="times" [size]="12"></svg>
                                }
                            </span>
                            {{ rule.label }}
                        </p-chip>
                    }
                </div>
            </div>
        </div>
```

### 5.3 Cards (`p-card`)

- Padding interno: **24 px**
- Bordes sutiles (`slate-200`)
- Contenido con jerarquía tipográfica clara
- Border radius: 12 px

Usar para:
- Información de entidad
- Métricas / KPIs
- Contenedores de formularios o secciones

### 5.4 Sidebar / Menú lateral (`p-panelmenu` o custom)

- Fondo: `navy-950` (`#101D30`)
- Ancho expandido de referencia: **336 px**
- Logo + selector de workspace en la parte superior
- Sección "PRINCIPAL" + items de navegación
- **Selección activa:** fondo `blue-600` + icono y texto blancos
- Items inactivos: texto claro sobre navy
- Separador visual antes de configuración / ayuda
- Footer con contexto (ej. "Nexo ERP / Espacio corporativo")

### 5.5 Checkbox (`p-checkbox`)

- Estados checked / unchecked claramente diferenciados
- Color de check: `blue-600`

---

## 6. Patrones de interacción clave

| Patrón                      | Implementación                                      |
|-----------------------------|-----------------------------------------------------|
| Acción primaria             | Solo un `button pButton` primario por vista/contexto |
| Feedback de estado          | Color semántico + texto descriptivo                 |
| Focus visible               | Anillo o borde azul claro en todos los controles    |
| Validación de formularios   | Mensaje de error debajo del campo + borde rojo      |
| Navegación activa           | Resaltado azul sólido en sidebar                    |
| Jerarquía de información    | Tipografía + peso + color (slate-900 → slate-600)   |

---

## 7. Guía rápida para el agente de IA

Cuando generes o modifiques UI:

1. **Colores** → Usa solo la paleta definida (navy-950, blue-600, slate-*).
2. **Tipografía** → Inter, tamaños de la escala, pesos Regular / Medium / Semibold.
3. **Espaciado** → Múltiplos de 4 px (preferiblemente 8, 12, 16, 24, 32).
4. **Componentes** → Prioriza PrimeNG (`button pButton`, `input pInputText`, `p-card`, `p-panelmenu`, `p-checkbox`…).
5. **Estados** → Siempre diseñar Normal / Hover / Focus / Disabled / Error.
6. **Accesibilidad** → Nunca comunicar estado solo con color; incluir texto.
7. **Tema** → Light theme por defecto. Sidebar oscuro (navy) es la excepción intencional.

---

## 8. Referencia visual de componentes (resumen)

- **Botones**: Primario (relleno azul), Secundario (outline), Texto.
- **Inputs**: Label arriba, ayuda debajo, validación en rojo debajo.
- **Cards**: Padding 24 px, bordes sutiles, títulos 18 px Semibold.
- **Sidebar**: Navy 950, item activo en Blue 600, ancho ~336 px.

---

*Documento generado a partir de las propuestas visuales "01 · Fundamentos" y "02 · Componentes" del Design System NEXO.*  
*Última actualización: Noviembre 2026*
