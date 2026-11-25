# Práctica 24 — El gimnasio instalable: PWA

## Preguntas de reflexión

1. **¿Cuáles son los tres requisitos de una PWA y qué hace cada uno?**
   - **Manifiesto (`manifest.webmanifest`):** archivo JSON que describe la identidad y apariencia de la aplicación (nombre, nombre corto, íconos en 192 px, 512 px y *maskable*, colores de tema y fondo, ruta inicial y modo de visualización `standalone`).
   - **Service Worker (`sw.js`):** script que se ejecuta en segundo plano, separado de la pestaña del navegador, e intercepta las peticiones de red (`fetch`) para responder desde la caché o desde la red según la estrategia configurada, permitiendo funcionar sin conexión.
   - **HTTPS (o `localhost` en desarrollo):** conexión cifrada obligatoria para garantizar que nadie altere el service worker ni los datos interceptados en tránsito.

2. **¿Qué archivos generó `vite-plugin-pwa` en `dist/` y para qué sirve cada uno?**
   - **`manifest.webmanifest`:** el manifiesto de la aplicación web generado en formato JSON a partir de la configuración de `VitePWA`.
   - **`sw.js`:** el service worker generado por Workbox con la lista de archivos a precachear y las reglas de `runtimeCaching`.
   - **`workbox-*.js`:** el módulo con la implementación de Workbox (estrategias `NetworkFirst`, `CacheFirst`, manejo de caché y expiración) que importa `sw.js`.
   - **`registerSW.js`:** el script encargado de ejecutar `navigator.serviceWorker.register('/sw.js')` desde el navegador para instalar y actualizar el service worker.
   - **`index.html` (modificado):** incluye automáticamente las etiquetas `<link rel="manifest" href="/manifest.webmanifest">` y `<script id="vite-plugin-pwa:register-sw" src="/registerSW.js"></script>`.

3. **¿Por qué las clases usan `NetworkFirst` y las imágenes `CacheFirst`?**
   - **Clases (`NetworkFirst`):** los horarios y los lugares disponibles cambian dinámicamente cuando los socios se inscriben o cancelan; por eso conviene consultar primero la red para mostrar datos actualizados y recurrir a la caché únicamente si no hay conexión o tarda más de 4 segundos.
   - **Imágenes (`CacheFirst`):** las fotografías de las clases prácticamente nunca cambian; servirlas primero desde la caché evita descargas repetidas, acelera la carga y ahorra datos móviles.

4. **¿Por qué en `npm run dev` no hay service worker?**
   - Porque durante el desarrollo Vite sirve módulos sin empaquetar con recarga en caliente (HMR); si un service worker estuviera activo cacheando archivos, devolvería versiones antiguas del código tras cada guardado y estorbaría al depurar. Por ello el service worker solo se genera en `npm run build` y se prueba con `npm run preview`.

5. **¿Qué diferencia hay entre una PWA y una aplicación híbrida?**
   - Una **PWA** es una aplicación web estándar servida desde una URL en HTTPS que el propio navegador instala mediante un manifiesto y un service worker, sin pasar por tiendas de aplicaciones ni empaquetarse en un binario nativo.
   - Una **aplicación híbrida** (como Capacitor, Cordova o Ionic) envuelve una aplicación web dentro de un contenedor nativo (`WebView`) compilado como `.apk`/`.aab` o `.ipa` para distribuirse en Google Play o App Store y acceder a APIs nativas del sistema mediante plugins.
