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


  <script>
    <?php
    require_once __DIR__ . './includes/select-data.js';
    require_once __DIR__ . './includes/insert-data.js';
    ?>
  </script>
</body>

</html>