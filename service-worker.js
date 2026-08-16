const CACHE_NAME = "calculadora-vuelto-v1";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json"
];


// ==========================================
// INSTALAR
// ==========================================

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(ARCHIVOS);

      })

  );

  self.skipWaiting();

});


// ==========================================
// ACTIVAR
// ==========================================

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(nombres => {

        return Promise.all(

          nombres.map(nombre => {

            if (
              nombre !== CACHE_NAME
            ) {

              return caches.delete(nombre);

            }

          })

        );

      })

  );

  self.clients.claim();

});


// ==========================================
// FUNCIONAMIENTO SIN INTERNET
// ==========================================

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

      .then(respuesta => {

        if (respuesta) {

          return respuesta;

        }


        return fetch(event.request);

      })

      .catch(() => {

        return caches.match("./index.html");

      })

  );

});
