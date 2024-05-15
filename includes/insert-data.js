let addBtn = document.querySelector("#new-user");
addBtn.addEventListener("click", addUser);

function addUser() {
  console.log("Button function ok");

  const formData = new FormData();
  formData.append("name", "giana");
  formData.append("surname", "rossi");
  formData.append("email", "ciao");
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
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
