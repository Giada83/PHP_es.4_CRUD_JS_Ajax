// !!!!!!! They work but I can't insert them correctly into the code.
// The errors are displayed correctly but if I close and reopen the form it gives me an error in the console.

function validateForm(form) {
  let isValid = true;
  const name = form.querySelector('input[name="name"]');
  const surname = form.querySelector('input[name="surname"]');
  const email = form.querySelector('input[name="email"]');
  const errorMessage = document.getElementById("errorMessage");

  console.log("Starting validation...");

  // Reset error messages
  if (errorMessage) {
    errorMessage.innerHTML = ""; // Rimuovi i messaggi di errore precedenti solo se esiste errorMessage
  }

  if (errorMessage) {
    errorMessage.innerHTML += "<p>Email format is incorrect.</p>";
    console.log("Email format is incorrect.");
  } else {
    console.error("errorMessage is null.");
  }

  // Validate name
  if (!name.value.trim()) {
    isValid = false;
    errorMessage.innerHTML += "<p>Name is required.</p>";
    console.log("Name is required.");
  } else if (name.value.trim().length < 2) {
    isValid = false;
    errorMessage.innerHTML += "<p>Name must be at least 2 characters long.</p>";
    console.log("Name must be at least 2 characters long.");
  } else {
    name.value = sanitizeInput(name.value);
    console.log("Name is valid.");
  }

  // Validate surname
  if (!surname.value.trim()) {
    isValid = false;
    errorMessage.innerHTML += "<p>Surname is required.</p>";
    console.log("Surname is required.");
  } else if (surname.value.trim().length < 2) {
    isValid = false;
    errorMessage.innerHTML += "<p>Surname must be at least 2 characters long.</p>";
    console.log("Surname must be at least 2 characters long.");
  } else {
    surname.value = sanitizeInput(surname.value);
    console.log("Surname is valid.");
  }

  // Validate email
  if (!email.value.trim()) {
    isValid = false;
    if (errorMessage) {
      errorMessage.innerHTML += "<p>Email is required.</p>";
      console.log("Email is required.");
    }
  } else if (!validateEmail(email.value)) {
    isValid = false;
    if (errorMessage) {
      errorMessage.innerHTML += "<p>Email format is incorrect.</p>";
      console.log("Email format is incorrect.");
    }
  } else {
    email.value = sanitizeInput(email.value);
    console.log("Email is valid.");
  }

  console.log("Validation completed. isValid:", isValid);

  return isValid;
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function sanitizeInput(input) {
  // Rimuovi gli spazi vuoti iniziali e finali
  input = input.trim();
  // Controlla solo i caratteri consentiti in un indirizzo email
  return input.replace(/[^\w\s@.-]/gi, "");
}
