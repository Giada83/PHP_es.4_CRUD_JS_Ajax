let isUpdateFormSubmitted = false; // Variabile di stato per controllare se l'evento di invio del modulo è già stato associato

function updateUser(e) {
  let id = e.target.getAttribute("data-val");
  console.log("update user: ", id);

  let updateUserForm = document.querySelector("#update-form");
  updateUserForm.style.display = "block";

  let updateForm = document.querySelector("#update-user-form");

  // A. Populate the form fields with the data obtained from the database
  fetch(`./includes/select.php?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((userData) => {
      console.log("Data from PHP:", userData);

      updateForm.reset(); // Reset the form

      // Iterate over the properties of the first object in the userData array using Object.entries().
      for (const [key, value] of Object.entries(userData[0])) {
        // For each key-value pair in the object, look for an input field in the form with a matching name attribute.
        const inputField = updateForm.querySelector(`[name="${key}"]`);
        if (inputField) {
          // Check if the form fields are correctly identified
          console.log("Populating field:", key, "with value:", value);
          // If it finds a matching input field, it populates it with the matching value from the PHP response.
          inputField.value = value;
        }
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // B) Submit update data after changing
  function submitUpdate(event) {
    event.preventDefault();

    // Ask for confirmation before submitting the form
    if (!confirm("Are you sure you want to make these changes?")) {
      return;
    }

    const formData = new FormData(updateForm);
    let jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch("./includes/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Corrected 'header' to 'headers'
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error("Error from server:", data.error);
        } else {
          console.log("Data received: ", data);

          updateUserForm.style.display = "none";

          // Update the table
          let table = document.querySelector("table");
          if (table) {
            table.parentNode.removeChild(table); // Changed 'tableContainer' to 'table.parentNode'
            updateTable();
          } else {
            console.error("Table element not found.");
          }
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // Verifica se l'evento di invio del modulo è già stato associato
  if (!isUpdateFormSubmitted) {
    updateForm.addEventListener("submit", submitUpdate);
    isUpdateFormSubmitted = true; // Imposta la variabile di stato a true per indicare che l'evento è stato associato
  }

  // C) Add button to close the form only if it doesn't exist yet
  if (!updateUserForm.querySelector(".close-button")) {
    const closeButton = document.createElement("button");
    closeButton.textContent = "Chiudi";
    closeButton.className = "close-button"; // Add a class to identify the close button
    closeButton.addEventListener("click", function () {
      updateUserForm.style.display = "none";
    });
    updateUserForm.appendChild(closeButton);
  }
}
