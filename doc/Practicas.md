# Arquitectura Frontend – Angular

## 1. Principios generales

La arquitectura del frontend se basa en la separación de responsabilidades, modularidad y reutilización de componentes.

Se busca mantener un código desacoplado, fácil de mantener, probar y extender, evitando concentrar demasiada lógica en los componentes.

Los principales criterios son:

- Organizar el código por funcionalidades.
- Separar presentación, coordinación de interfaz, estado y lógica de aplicación.
- Favorecer componentes reutilizables y especializados.
- Utilizar Signals para la gestión reactiva del estado (ya se hace con la libreria ngrx-signals).
- Evitar dependencias innecesarias entre funcionalidades.
- Mantener los componentes contenedores lo más simples posible.

## 2. Componentes

Se establecen dos tipos principales de componentes.

### 2.1. Componentes de presentación

Son componentes enfocados exclusivamente en la representación visual y la interacción con el usuario.

Responsabilidades:

- Recibir información mediante `input()`. (son signals, ya no es necesario usar @Input())
- Comunicar eventos mediante `output()` (son signals, ya no es necesario usar @Output()).
- Representar los datos recibidos.
- Gestionar interacciones visuales.

Restricciones:

- No deben consumir servicios HTTP.
- No deben acceder directamente a los stores.
- No deben implementar reglas de negocio.
- No deben conocer los mecanismos de almacenamiento de información.

### 2.2. Componentes contenedores

Son responsables de coordinar la interfaz con el estado de la aplicación.

Responsabilidades:

- Consumir los estados expuestos por los stores.
- Enviar acciones de usuario a los stores.
- Proporcionar información a los componentes de presentación.
- Gestionar navegación e interacciones propias de la pantalla.
- Mantener estados locales cuando sean exclusivos de la interfaz.

Restricciones:

- No deben implementar reglas de negocio.
- No deben realizar peticiones HTTP directamente.
- No deben coordinar procesos complejos que correspondan a casos de uso.
- No deben duplicar estados que ya administra un store.

## 3. Stores y gestión del estado

Los stores son responsables de administrar el estado reactivo de una funcionalidad de la aplicación.

### Responsabilidades

- Mantener el estado interno de la funcionalidad.
- Exponer Signals de solo lectura mediante `asReadonly()`.
- Proporcionar métodos que representen acciones de la funcionalidad.
- Coordinar servicios y casos de uso.
- Actualizar el estado con los resultados de las operaciones.
- Gestionar estados asíncronos, como carga y errores.

## 4. Servicios

Los servicios encapsulan operaciones de acceso a recursos externos y comunicación con el backend.

### Responsabilidades

- Realizar peticiones HTTP.
- Encapsular endpoints y comunicación con APIs.
- Transformar respuestas cuando corresponda.
- Proporcionar operaciones reutilizables.

## 5. Casos de uso

Los casos de uso encapsulan operaciones de aplicación que requieren coordinación de diferentes servicios o ejecución de procesos con una responsabilidad específica.

Se utilizarán principalmente cuando una operación:

- Involucre múltiples servicios.
- Requiera coordinar varios pasos.
- Contenga reglas de aplicación.

### Responsabilidades

- Recibir los datos necesarios para ejecutar la operación.
- Coordinar los servicios requeridos.
- Ejecutar las validaciones correspondientes al flujo de aplicación.

No todas las operaciones necesitan un caso de uso. Para operaciones sencillas, como una consulta o un CRUD básico, el store puede consumir directamente el servicio correspondiente.

## 6. Flujo de responsabilidades

El flujo habitual de una operación será:

1. El usuario realiza una interacción en la interfaz.
2. El componente de presentación emite un evento.
3. El componente contenedor recibe el evento y ejecuta una acción del store.
4. El store coordina la operación mediante un servicio o caso de uso.
5. El servicio realiza la comunicación con el backend.
6. El resultado regresa al store.
7. El store actualiza sus Signals.
8. Los componentes reflejan automáticamente los cambios del estado.

No todas las operaciones requieren pasar por todas las capas. Se debe utilizar la estructura necesaria según la complejidad de cada operación.