# Frontend-Web-Practicas

## Práctica 21 - Panel del gimnasio: rutas, formulario y la API

### Ejercicio 1: el router y las páginas
1. **¿Qué pieza de React Router corresponde a `router-outlet`, a `routerLink` y a `routerLinkActive`?**
- `router-outlet` equivale a `<Outlet />`, el contenedor donde se renderiza el componente correspondiente a la ruta activa.
- `routerLink` equivale a `<Link to="...">`, que permite navegar entre vistas SPA sin recargar el documento completo.
- `routerLinkActive` equivale a `<NavLink>`, aplicando automáticamente una clase CSS cuando la ruta coincide con la URL actual.

2. **¿Por qué la ruta comodín (`**`) va al final y la ruta vacía necesita `pathMatch: 'full'`?**
- Angular evalúa el arreglo de rutas de arriba hacia abajo y selecciona la primera coincidencia; como `**` coincide con cualquier trayectoria, colocarla antes interceptaría todas las demás rutas.
- La ruta vacía `''` es prefijo de cualquier URL (el modo por defecto es `'prefix'`), por lo que requiere `pathMatch: 'full'` para activarse únicamente cuando la ruta está completamente vacía y evitar redirecciones continuas.

### Ejercicio 2: el formulario de nueva clase
1. **¿Dónde vive el valor de un campo en un formulario reactivo y en qué se diferencia del `useState` de React?**
- El valor y el estado de validación residen dentro de una instancia de `FormControl` (agrupada en un `FormGroup`) en la clase TypeScript, fuera del DOM.
- A diferencia de `useState` en React —donde cada entrada dispara una actualización de estado y vuelve a renderizar el árbol del componente mediante `value` y `onChange`—, en Reactive Forms el `FormControl` gestiona sus cambios directamente sin reconstruir el componente completo en cada pulsación.

2. **¿Qué regresa un validador propio cuando el valor es válido y cuando no, y cómo se relaciona con `hasError`?**
- Regresa `null` cuando el valor cumple la regla y un objeto de errores (`ValidationErrors`, por ejemplo `{ multiploDeCinco: true }`) cuando falla.
- La clave de ese objeto es exactamente el identificador que se consulta mediante `control.hasError('multiploDeCinco')` en la plantilla para mostrar el mensaje correspondiente.

### Ejercicio 3: el catálogo desde la API
1. **¿Qué cambió en el servicio del catálogo y por qué ningún componente se enteró?**
- Se sustituyó el `signal` estático inicializado con `CLASES_LOCALES` por un `httpResource` conectado a `GET /clases`, derivando la lista mediante `computed`.
- Ningún componente tuvo que modificarse para consumir el catálogo porque el servicio conservó exactamente la misma interfaz pública de señales (`clasesFiltradas`, `totalMinutos`, `categoriaActiva`, `claseActiva`) y métodos.

2. **¿Por qué no hizo falta iniciar sesión para leer el catálogo?**
- Porque en el backend de NestJS el endpoint `GET /clases` está marcado con el decorador `@Publico()`, indicando al guardia global `JwtAuthGuard` que permita la consulta sin exigir token JWT.
