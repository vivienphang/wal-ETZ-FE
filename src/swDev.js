const swDev = () => {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((reg) => {
      console.log("SW Registered:", reg);
    })
    .catch((err) => console.log(err));
};
module.exports = swDev;
