//name of our cache storage
const CACHA_NAME = "v1";
//main url when online and when offline
const urlsToCache = ["index.html", "offline.html"];

//this represents the service worker
const self = this;
//installation event to install service worker
//service worker it(self)
self.addEventListener("install", (event) => {
  //open cache and add file to the cache
  event.waitUntil(
    //caches.open returns a promise
    caches.open(CACHA_NAME).then((cache) => {
      console.log("Opened Cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf("http") === 0)) return;
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => {
        return caches.match("offline.html");
      });
    })
  );
});

//Activate Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHA_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////Offline site caching////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// version of the current cahching folders
// to be used when pushing new cahching
