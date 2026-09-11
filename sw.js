// Service Worker de la Grillo Liga Argentina.
// Prioridad: que la app se actualice sola, sin que haga falta entrar a la página oficial.
// Por eso NO se guarda el sitio en caché de forma agresiva — siempre se busca la versión
// más nueva por red. skipWaiting + clients.claim hacen que, apenas hay una versión nueva
// disponible, tome el control enseguida (sin esperar a que se cierren todas las pestañas).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Siempre va a buscar a la red primero. Si no hay conexión, avisa que no hay internet
  // (no se pidió que la app funcione sin conexión, así que no se guarda nada en caché).
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(
        '<h1>Sin conexión</h1><p>La Grillo Liga necesita internet para cargar.</p>',
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    })
  );
});
