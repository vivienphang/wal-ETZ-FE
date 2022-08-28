/* eslint-disable no-restricted-globals */
const version = "1.3";
const assets = [
  "/",
  "index.html",
  "images/logo.png",
  "images/d.png",
  "main.js",
  "/manifest.json",
  "/static/js/bundle.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    // caching our static assets on install
    caches.open(`static-${version}`).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener("activate", (e) => {
  // clean static cache
  const cleaned = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== `static-${version}` && key.match("static-")) {
        return caches.delete(key);
      }
    });
  });
  e.waitUntil(cleaned);
});

// Static Cache Strategy
const staticCache = (req) => {
  const p = caches.match(req).then((cachedRes) => {
    if (cachedRes) return cachedRes;
    // If no cache go to network to get files
    return fetch(req).then((networkRes) => {
      // Update the Cache with new files from network
      caches.open(`static-${version}`).then((cache) => {
        cache.put(req, networkRes.clone());

        // Return Clone of Network Res as it can only be used once
        return networkRes;
      });
    });
  });
  return p;
};

self.addEventListener("fetch", (e) => {
  // App Shell
  if (e.request.url.match(location.origin)) {
    e.respondWith(staticCache(e.request));
  }
});
