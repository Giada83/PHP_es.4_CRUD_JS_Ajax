function deleteUser(e) {
  let id = e.target.getAttribute("data-val");
  console.log("delete user: ", id);

  const formData = new FormData();
  formData.append("id", id);
  fetch("./includes/delete.php", {
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

        let table = document.querySelector("table");
        tableContainer.removeChild(table);
        updateTable();
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
