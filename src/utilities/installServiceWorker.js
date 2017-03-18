if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").catch(function(err) {
      // eslint-disable-next-line no-console
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}
