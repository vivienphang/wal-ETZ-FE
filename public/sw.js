/* eslint-disable no-restricted-globals */
const version = "1.23124";
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
//

self.addEventListener("fetch", (e) => {
  // App Shell
  if (e.request.url.match(location.origin)) {
    e.respondWith(staticCache(e.request));
  }

  // else if (
  //   e.request.url.match("an api call or axios call that we may want to cache")
  // ) {
  //   e.respondWith(fallbackCache(e.request));
  // }
});

// check network first then check cache
// const fallbackCache = (req) =>
//   // Try Network

//   fetch(req)
//     .then((networkRes) => {
//       // Check Res is ok go to cache
//       if (!networkRes.ok) throw "Fetch Error";
//       //if network goes through add files to cache
//       caches
//         .open(`static-${version}`)
//         .then((cache) => cache.put(req, networkRes.clone()));
//       return networkRes;
//     })
//     .catch((err) => {
//       // if there is an error in getting files from network fall back on caches to find those files
//       caches.match(req);
//     });
