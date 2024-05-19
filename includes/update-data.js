let isUpdateFormSubmitted = false; // State variable to check whether the form submit event has already been bound

function updateUser(e) {
  let id = e.target.getAttribute("data-val");
  console.log("update user: ", id);

  let updateUserForm = document.querySelector("#update-form");
  updateUserForm.style.display = "block";

  let updateForm = document.querySelector("#update-user-form");

  // Remove existing error messages
  function removeErrorMessages() {
    const errorMessages = updateUserForm.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());
  }

  // Remove error messages before populating the form
  removeErrorMessages();

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

    // Remove all previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });

    const formData = new FormData(updateForm);
    let jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch("./includes/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.response === 0) {
          // Error response from server
          console.error("Error from server:", data.message);
          // Display error message above the form
          const errorMessage = document.createElement("div");
          errorMessage.textContent = data.message;
          errorMessage.className = "error-message"; // Add a class to style the error message
          updateUserForm.insertBefore(errorMessage, updateUserForm.firstChild); // Insert error message above the form
        } else {
          // Check if the user wants to proceed with the update
          if (confirm("Are you sure you want to make these changes?")) {
            // If confirmed, proceed with the update
            console.log("User confirmed update.");

            console.log("Data received: ", data);

            appendAlert("The user data has been successfully changed", "warning");

            updateUserForm.style.display = "none";

            // Update the table
            let table = document.querySelector("table");
            if (table) {
              table.parentNode.removeChild(table);
              updateTable();
            } else {
              console.error("Table element not found.");
            }
          } else {
            // If not confirmed, do nothing
            console.log("User canceled update.");
          }
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // Check if the event has already been associated with the update button
  if (!isUpdateFormSubmitted) {
    updateForm.addEventListener("submit", submitUpdate);
    isUpdateFormSubmitted = true; // Set the state variable to true to indicate that the event has been attached
  }

  // C. Close form
  //1. Check if the close button doesn't already exist
  if (!updateUserForm.querySelector(".close-button")) {
    // 2.Create a new close button
    const closeButton = document.createElement("button");
    // 3.Set the text content of the close button
    closeButton.textContent = "Close";
    // 4.Add a class to identify the close button
    closeButton.className = "close-button btn-form b";
    // 5.Set the type of the button to avoid the default form submission behavior
    closeButton.type = "button";
    // 6.Add an event listener to handle the click event of the close button
    closeButton.addEventListener("click", function () {
      // Hide the update user form when the close button is clicked
      updateUserForm.style.display = "none";
      // Remove error messages when the form is closed
      removeErrorMessages();
    });

    // 8.Find the submit button inside the form
    const submitButton = updateUserForm.querySelector(".submit");

    //9. Insert the close button next to the submit button
    submitButton.parentNode.insertBefore(closeButton, submitButton.nextSibling);
  }
}
