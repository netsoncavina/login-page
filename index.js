users = [];
function signin() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email-signin").value;
  let password = document.getElementById("password-signin").value;

  if (validateCredentials(name, email, password)) {
    let temp = saveCredentials(name, email, password);
    users.push(temp);
  }
}

function validateCredentials(name, email, password) {
  if (name === "" || email === "" || password === "") {
    swal("Please fill all the fields", "", "error");
  } else if (!email.includes("@")) {
    swal("Please enter a valid email", "", "error");
  } else if (!email.includes(".")) {
    swal("Please enter a valid email", "", "error");
  } else if (password.length < 8) {
    swal("Password must be at least 8 characters long", "", "error");
  } else {
    return true;
  }
}

function saveCredentials(name, email, password) {
  let encrypted = encrypt(password);
  let user = {
    name: name,
    email: email,
    password: encrypted,
  };

  swal("Credentials saved", `Welcome ${user.name}!`, "success");

  return user;
}

function checkCredentials(email, password) {
  let email_login = document.getElementById("email-login").value;
  let password_login = document.getElementById("password-login").value;

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === email_login &&
      decrypt(users[i]) === password_login
    ) {
      swal(
        "Success",
        `Login Successful! \nWelcome ${users[i].name}!`,
        "success"
      );
      return true;
    }
  }
  //   swal("Login failed");
  swal("Login failed", "", "error");
}

function togglePasswordSignin() {
  let eye = document.getElementById("toggle-eye-signin");

  if (document.getElementById("password-signin").type === "password") {
    document.getElementById("password-signin").type = "text";
    eye.setAttribute(
      "class",
      "fa fa-fw fa-eye-slash field-icon toggle-password"
    );
  } else {
    document.getElementById("password-signin").type = "password";
    eye.setAttribute("class", "fa fa-fw fa-eye field-icon toggle-password");
  }
}

function togglePasswordLogin() {
  let eye = document.getElementById("toggle-eye-login");
  if (document.getElementById("password-login").type === "password") {
    document.getElementById("password-login").type = "text";
    eye.setAttribute(
      "class",
      "fa fa-fw fa-eye-slash field-icon toggle-password"
    );
  } else {
    document.getElementById("password-login").type = "password";
    eye.setAttribute("class", "fa fa-fw fa-eye field-icon toggle-password");
  }
}

function encrypt(password) {
  let encrypted = CryptoJS.AES.encrypt(password, "secret key 123");
  return encrypted.toString();
}

function decrypt(user) {
  let decrypted = CryptoJS.AES.decrypt(user.password, "secret key 123");
  return decrypted.toString(CryptoJS.enc.Utf8);
}
