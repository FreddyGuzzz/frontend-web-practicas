# Frontend-Web-Practicas

## Práctica 20 - Panel del gimnasio: signals, servicio y filtro

1. **¿Qué diferencia hay entre un `signal` y un `computed`, y cuál se parece a `useState` y cuál a `useMemo`?**
- Un `signal` almacena un estado reactivo que puede actualizarse directamente con `.set()` o `.update()`, mientras que un `computed` es un valor derivado de solo lectura que se recalcula automáticamente cuando cambian las señales de las que depende.
- Por su comportamiento, `signal` equivale a `useState` y `computed` equivale a `useMemo`.

2. **¿Qué pasa si el filtro hace `new Catalogo()` en lugar de `inject(Catalogo)`?**
- Se instanciaría un objeto independiente exclusivo para el componente del filtro, por lo que al cambiar la categoría seleccionada el tablero principal no reaccionaría al no compartir la misma instancia del servicio.
