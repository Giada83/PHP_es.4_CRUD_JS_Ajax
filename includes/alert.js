function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`; // Corrected class name

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector(".form-style");
  container.insertBefore(div, form);

  setTimeout(() => div.remove(), 3000); // Removed incorrect class selector
}
