// registering service worker
if (navigator.serviceWorker) {
  // Register SW
  navigator.serviceWorker.register("./sw.js").catch(console.error);
}
