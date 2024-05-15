let addBtn = document.querySelector("#new-user"); //select button with id="new-user"
addBtn.addEventListener("click", addUser); //start f addUser when button is clicked

function addUser() {
  let userForm = document.querySelector("#user-form");
  userForm.style.display = "block"; //selecting the div with the id "user-form" and setting the display CSS style to "block" to make it visible.

  let addUserForm = document.querySelector("#add-user-form"); //select form trough id

  //When the user submits the form a function is activated to manage the form submission.
  addUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //Form data is collected using FormData, which creates an object containing all key/value pairs of form fields.
    // 1. creates a new FormData object from the HTML form with the id "add-user-form".
    //FormData is a built-in JavaScript object that represents a set of key/value pairs for HTML form data.
    const formData = new FormData(addUserForm);
    // 2. initializes a new empty JavaScript object
    let jsonData = {};
    //3. Iterating on FormData data
    //The for...of loop is used to iterate over all key/value pairs present in the FormData formData object. This loop extracts each key/value pair using FormData's entries() method.
    for (const [key, value] of formData.entries()) {
      //4.Assigning data to jsonData
      //Inside the loop, each key/value pair is assigned to a corresponding attribute in the jsonData object.
      jsonData[key] = value;
    }

    fetch("./includes/insert.php", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData), //data is then converted into a JavaScript object and then into a JSON string using JSON.stringify().
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

          userForm.style.display = "none"; // Hide the user form

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
