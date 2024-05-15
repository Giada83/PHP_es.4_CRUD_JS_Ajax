updateTable();

let users;
let tableContainer = document.querySelector("#container"); //select the HTML element that has the id attribute equal to "container" and store it in the tableContainer variable.

function updateTable() {
  fetch("./includes/select.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
        users = data; // all collected data will end up in the users variable to be reused
        console.log("Data received: ", data);

        let table = `
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Surname</td>
                <td>Email</td>
              </tr>
            </thead>
  
            <tbody>${insertTable(data)}</tbody>
          </table>
          `;

        tableContainer.insertAdjacentHTML("beforeend", table); //insert HTML code at a specified position relative to the reference element (tableContainer -> div id='container'). 1°argument = string that specifies the relative position where to insert the HTML code -> "beforeend" indicates that the HTML code should be placed inside the tableContainer element.2°argument = string containing the HTML code to insert. In this case, the table variable contains the HTML code of the table.
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function insertTable(users) {
  //users = array of object that contain fetch data
  let rows = "";
  users.forEach((user) => {
    let row = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.surname}</td>
        <td>${user.email}</td>
        <td>
          <button class="update-user" data-val="${user.id}">Update</button>
          <button class="delete-user" data-val="${user.id}">Delete</button>
        </td>
      </tr>`;

    rows += row; //The row string is concatenated with the rows variable, accumulating all the rows of the table as it iterates over each user.
  });
  return rows; //An empty string that now contains the HTML code for all rows in the table.
}
