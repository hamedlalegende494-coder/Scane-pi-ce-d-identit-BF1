// Service worker Scan-ID
// Rôle : rendre l'application installable et permettre un chargement rapide.
// Note : l'app utilise des librairies chargées depuis un CDN (Tesseract.js, xlsx,
// jsPDF, PeerJS, QRCode) et la fonction "Scanner à distance" nécessite Internet
// (signalisation PeerJS). Une connexion est donc requise au moins pour ces usages.

const CACHE_NAME = "scan-id-cache-v1";
const APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icon-72.png",
  "./icon-96.png",
  "./icon-128.png",
  "./icon-144.png",
  "./icon-152.png",
  "./icon-192.png",
  "./icon-384.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // On ne gère que les requêtes GET du même type navigation/asset locaux.
  if (req.method !== "GET") return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Met à jour le cache avec la réponse la plus récente si possible.
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          try {
            cache.put(req, resClone);
          } catch (e) {
            // Ignorer les erreurs de mise en cache (ex: réponses opaques cross-origin)
          }
        });
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match("./index.html"))
      )
  );
});
