let addBtn = document.querySelector("#new-user"); // Select the button with id="new-user"
let userForm = document.querySelector("#user-form"); // Select the div with id="user-form"
let addUserForm = document.querySelector("#add-user-form"); // Select the form with id="add-user-form"
let closeButton = document.querySelector("#close-button"); // Select the close button

let submitHandlerAdded = false; // Flag to keep track if the event listener has been added

// Function to open the form
function addUser() {
  userForm.style.display = "block"; // Show the form
  // Add the event listener for the form submit only if it hasn't been added already
  if (!submitHandlerAdded) {
    addUserForm.addEventListener("submit", submitHandler);
    submitHandlerAdded = true;
  }
}

// Function to close the form
function closeForm(event) {
  event.preventDefault(); // Prevent the default behavior of the close button
  userForm.style.display = "none"; // Hide the form

  // Remove all error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

  // Clear form fields
  addUserForm.reset();

  // Remove the event listener for the form submit
  addUserForm.removeEventListener("submit", submitHandler);
  submitHandlerAdded = false; // Reset the flag
}

// Function for submit data
function submitHandler(event) {
  event.preventDefault();

  // Remove all previous error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

  // Collect form data
  const formData = new FormData(addUserForm);

  // Check if the form is empty
  let isFormEmpty = true;
  for (const [, value] of formData.entries()) {
    if (value.trim() !== "") {
      isFormEmpty = false;
      break;
    }
  }

  if (isFormEmpty) {
    closeForm(event); // If the form is empty, don't submit data and close it
    return;
  }

  // Create JSON object from form data
  let jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  // Send POST request
  fetch("./includes/insert.php", {
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
        userForm.insertBefore(errorMessage, userForm.firstChild); // Insert error message above the form
      } else {
        console.log("Data received: ", data);

        // Hide the form after successful submission
        userForm.style.display = "none";

        // Update the table
        let table = document.querySelector("table");
        tableContainer.removeChild(table);
        updateTable();

        // Reset form fields
        addUserForm.reset();

        // Show a success message
        appendAlert("The user has been successfully added", "success");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Event listener
addBtn.addEventListener("click", addUser); // add button
closeButton.addEventListener("click", closeForm); // close button
