let addBtn = document.querySelector("#new-user");
addBtn.addEventListener("click", addUser);

function addUser() {
  console.log("Button function ok");

  const formData = new FormData();
  formData.append("name", "giana");
  formData.append("surname", "rossi");
  formData.append("email", "gnam");
  console.log(formData);

  fetch("./includes/insert.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: formData,
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

        // 1. select the table element
        // 2. removes the table from the parents
        // 3. calls a function to update the table and create it again.
        let table = document.querySelector("table");
        tableContainer.removeChild(table);
        updateTable();
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
