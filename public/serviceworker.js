// name of our cache storage
const cacheName = "v1";

// calling install event
// self is this service worker
// const self = this;

self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

//activate event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches here
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Deleting Old Chache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//fetch files to display
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  //check if live site is available if not load cached files
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //Make a Copy of response
        const resClone = res.clone();
        ///openning a cache
        caches.open(cacheName).then((cache) => {
          //Adding the whole response files as a cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => {
        caches.match(e.request).then((res) => {
          return res;
        });
      })
  );
});
