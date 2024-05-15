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
  <div id="container"></div>

  <div id="user-form" style="display: none;">
    <form id="add-user-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="surname">Surname:</label>
      <input type="text" id="surname" name="surname"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <button type="submit">Submit</button>
    </form>
  </div>


  <script>
    <?php
    require_once __DIR__ . './includes/select-data.js';
    require_once __DIR__ . './includes/insert-data.js';
    ?>
  </script>
</body>

</html>