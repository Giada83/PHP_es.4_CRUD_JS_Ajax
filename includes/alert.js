const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const appendAlert = (message, type, timeout = 3000) => {
  // Svuota il contenitore degli errori prima di aggiungere un nuovo messaggio
  alertPlaceholder.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  // Imposta il timeout per rimuovere l'alert dopo il tempo specificato
  setTimeout(() => {
    wrapper.remove();
  }, timeout);
};
