function updateUser(e) {
  let id = e.target.getAttribute("data-val");
  console.log("update user: ", id);

  let updateUserForm = document.querySelector("#update-form");
  updateUserForm.style.display = "block";

  let updateForm = document.querySelector("#update-user-form");

  //   -----------------------------
  fetch(`./includes/select.php?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((userData) => {
      console.log("Data from PHP:", userData);

      // Popolare i campi del form con i dati ottenuti dal database
      updateForm.reset(); // Resettare il form prima di popolarlo con i nuovi dati
      for (const [key, value] of Object.entries(userData[0])) {
        // Accedi al primo oggetto nell'array
        const inputField = updateForm.querySelector(`[name="${key}"]`);
        if (inputField) {
          console.log("Populating field:", key, "with value:", value); // Verifica se i campi del form vengono correttamente individuati
          inputField.value = value;
        }
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // -------------------------------
  updateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(updateForm);
    let jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch("./includes/update.php", {
      method: "POST",
      header: { "Content-Type": "application/json" },
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
          tableContainer.removeChild(table);
          updateTable();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
}
