<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CRUD with PHP,Ajax and Js</title>
</head>

<body>
  <h1>Students</h1>
  <button id="new-user">ADD STUDENT</button>

  <!-- Insert data form -->
  <div id="user-form" style="display: none;">
    <form id="add-user-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="surname">Surname:</label>
      <input type="text" id="surname" name="surname"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <button type="submit">Submit</button>
      <button id="close-button">Close</button>
    </form>
  </div>

  <!-- Update data form -->
  <div id="update-form" style="display: none;">
    <form id="update-user-form">
      <input type="hidden" name="id">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="surname">Surname:</label>
      <input type="text" id="surname" name="surname"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <button type="submit">Submit</button>
    </form>
  </div>

  <div id="container"></div>

  <script src="./includes/select-data.js"></script>
  <script src="./includes/insert-data.js"></script>
  <script src="./includes/update-data.js"></script>
  <script src="./includes/delete-data.js"></script>
</body>

</html>