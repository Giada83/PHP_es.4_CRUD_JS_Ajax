function validate() {
  let name = document.getElementById("name");
  let surname = document.getElementById("email");
  let email = document.getElementById("email");
  let errorBox = document.getElementById("errorMessage");
  let alertDiv = '<div class="alert alert-danger alert-dismissibile" role="alert">';
  let alertBtn =
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

  name.style.border = "1px solid #ccc";
  surname.style.border = "1px solid #ccc";
  email.style.border = "1px solid #ccc";

  //check empty fields
  if (name.value == "" || surname.value == "" || email.value == "") {
  }
}
