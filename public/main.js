// registering service worker
if (navigator.serviceWorker) {
  // Register SW
  navigator.serviceWorker.register("./sw.js").catch(console.error);
}
const showNotification = () => {
  // use let as this will change
  const notificationOpts = {
    body: "Hi From notifications",
    icon: "./images/logo.png",
  };
  // give logic for notifications
  Notification("New Notification", notificationOpts);
};
// Getting notification permission
if (window.Notification) {
  // Managing Permission
  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "granted") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
}
