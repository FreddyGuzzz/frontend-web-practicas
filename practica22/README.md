# Práctica 22 — El panel del gimnasio: crear y editar clases

## Preguntas de reflexión

### Ejercicio 1: Guardar con POST
1. **Si el formulario ya valida, ¿por qué también valida el servidor?**
   Porque las validaciones del navegador pueden saltarse fácilmente desde DevTools o enviando peticiones HTTP directas (`curl`, Postman, scripts). El servidor es la frontera real de seguridad e integridad de datos y debe garantizar que ningún dato inválido llegue a la base de datos.

2. **¿Por qué `httpResource` para leer y `HttpClient` para crear, editar y eliminar?**
   `httpResource` está diseñado para lecturas reactivas declarativas: se dispara automáticamente cuando cambian sus parámetros y expone señales de estado (`value()`, `isLoading()`, `error()`) y `reload()`. En cambio, las mutaciones (`POST`, `PATCH`, `DELETE`) ocurren por una acción imperativa del usuario (enviar un formulario o confirmar un borrado) y requieren controlar el flujo paso a paso con `HttpClient` (deshabilitar botones, mostrar errores puntualizados y navegar al completarse).

3. **¿Qué pasa si se olvida el `subscribe()`?**
   En Angular, los `Observable` devueltos por `HttpClient` son fríos (*cold*): si no se llama a `.subscribe()`, la petición HTTP nunca se ejecuta ni se envía al servidor.

---

### Ejercicio 2: El login, los interceptores y el guardia
4. **¿A qué pieza de React corresponden las rutas hijas (`children`), el interceptor y el guardia?**
   - **Rutas hijas (`children`):** equivalen a las rutas anidadas con `<Outlet />` de React Router dentro de un componente *Layout* compartido.
   - **Interceptor (`HttpInterceptorFn`):** equivale a los interceptores de instancia en Axios (`axios.interceptors.request` / `response`) o a un *wrapper* centralizado sobre `fetch`.
   - **Guardia (`CanActivateFn`):** equivale a un componente envoltorio de ruta protegida (*ProtectedRoute* / *PrivateRoute*) que evalúa la sesión antes de renderizar la vista y redirige con `<Navigate />` si no hay permisos.

5. **¿Cuándo se ejecuta el guardia y por qué `salir()` tiene que navegar al login?**
   El guardia `canActivate` se ejecuta antes de activar la ruta protegida (al entrar por primera vez o al cambiar de URL hacia una ruta hija del panel). `salir()` debe navegar explícitamente a `/login` porque limpiar la señal y el `localStorage` no dispara por sí solo una navegación; el usuario quedaría viendo la pantalla actual hasta que intentara cambiar de ruta.

---

### Ejercicio 3: Editar, eliminar y la guarda de salida
6. **¿Cómo decide un mismo formulario, con dos rutas, si manda `POST` o `PATCH`?**
   Mediante la entrada `id = input<string>()` vinculada al parámetro de ruta `:id`. Cuando la ruta es `/clases/nueva`, `id()` es `undefined` y `guardar()` envía `POST /clases`; cuando la ruta es `/clases/:id/editar`, `id()` contiene el identificador de la clase y `guardar()` envía `PATCH /clases/:id`.

---

### Entrega
7. **¿Por qué el estado del formulario no se puede observar con un `computed()`?**
   Porque los formularios reactivos (`FormGroup` / `FormControl`) gestionan su estado mediante propiedades mutables y flujos RxJS (`valueChanges`, `statusChanges`), no con señales (*Signals*) de Angular. Un `computed()` solo rastrea señales leídas dentro de su función, por lo que no detecta cambios internos del formulario a menos que se conviertan primero con `toSignal()`.

8. **¿Qué diferencia hay entre `canActivate` y `canDeactivate`, y qué casos no cubre la guarda de salida?**
   `canActivate` decide si el usuario puede **entrar** a una ruta (por ejemplo, verificando autenticación y rol de administrador), mientras que `canDeactivate` decide si el usuario puede **abandonar** la ruta actual dentro de la aplicación Angular (por ejemplo, cuando hay cambios sin guardar en el formulario). `canDeactivate` no cubre salidas fuera del router de Angular, como cerrar la pestaña, cerrar el navegador, recargar la página (`F5`) o escribir una URL externa directamente en la barra de direcciones.

9. **Opcional — ¿Por qué la ruta de crear (`clases/nueva`) va antes que la del id (`clases/:id`)?**
   Porque Angular Router evalúa las rutas en orden de declaración usando la primera coincidencia (*first-match wins*). Si `clases/:id` estuviera primero, el segmento `"nueva"` se interpretaría como el parámetro `:id` y cargaría el componente de detalle en lugar del formulario de creación.
