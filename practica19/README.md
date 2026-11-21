# Frontend-Web-Practicas

## Práctica 19 - Panel del gimnasio: tablero en Angular

1. **¿Qué archivo de Angular hace el papel de `main.tsx`, de `App.tsx` y de `vite.config.ts`?**
- `main.tsx` equivale a `src/main.ts`, ya que es el punto de entrada que inicializa la aplicación en el navegador.
- `App.tsx` equivale a `src/app/app.component.ts` junto con `src/app/app.component.html`, donde se define la lógica y la vista del componente raíz.
- `vite.config.ts` equivale a `angular.json`, que concentra la configuración de compilación, rutas de assets y hojas de estilo.

2. **¿Por qué `clase()` lleva paréntesis y para qué sirve `track`?**
- `input()` devuelve una señal (`Signal`), y en Angular las señales se leen invocándolas como función mediante paréntesis para obtener su valor actual.
- `track` asigna una clave única (como el `id`) a cada elemento dentro de `@for` para que Angular identifique qué nodo cambió o se eliminó sin volver a renderizar toda la lista.
