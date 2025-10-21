// ===============variables============================

var userNameInput = document.querySelector("#userNameInput");
var emailInput = document.querySelector("#emailInput");
var passwordInput = document.querySelector("#passwordInput");
var registerForm = document.querySelector("#registerForm");
var inputs = document.querySelectorAll(".signUp");
var messageAllInputs = document.querySelector("#messageOne");
var messageEmail = document.querySelector("#messageTwo");
var messageSucess = document.querySelector("#messageThree");
var informName = document.querySelector("#informName");
var informEmail = document.querySelector("#informEmail");
var informPass = document.querySelector("#informPass");
var personList = [];
var personEmail = [];

// ===============login variable================================

var loginForm = document.querySelector("#loginForm");
var emailLogInput = document.querySelector("#emailLogInput");
var passwordLogInput = document.querySelector("#passwordLogInput");
var incorrect = document.querySelector("#messageFour");

// =========================home variable========================

var heroWrapper = document.querySelector(".hero-wrapper");
var nameHome = document.createElement("h1");
var text = document.createTextNode(`Welcome ${localStorage.getItem("name")}`);
var logOut =document.querySelector("#logOut");

// =====================================================

if (localStorage.getItem("persons") !== null) {
  personList = JSON.parse(localStorage.getItem("persons"));
  for (let i = 0; i < personList.length; i++) {
    personEmail.push(personList[i].email);
  }
}

// ==================SignUP=================

if (registerForm) {
  registerForm.addEventListener("submit", function (eventinfo) {
    eventinfo.preventDefault();
    if (
      validateForm(userNameInput) &&
      validateForm(emailInput) &&
      validateForm(passwordInput)
    ) {
      var person = {
        name: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      if (personEmail.includes(emailInput.value)) {
        messageEmail.classList.replace("d-none", "d-block");
        return;
      } else {
        personList.push(person);
        personEmail.push(person.email);
        localStorage.setItem("persons", JSON.stringify(personList));
        console.log(personList);
        clearForm();
        messageSucess.classList.replace("d-none", "d-block");
        setTimeout(locationLogin, 1000);
      }
    } else {
      messageAllInputs.classList.replace("d-none", "d-block");
    }
  });
}

// ================Login===================

if (loginForm) {
  loginForm.addEventListener("submit", function (eventinfo) {
    eventinfo.preventDefault();
    for (let i = 0; i < personList.length; i++) {
      if (
        personList[i].email === emailLogInput.value &&
        personList[i].password === passwordLogInput.value
      ) {
        localStorage.setItem("name", personList[i].name);
        // clearForm();
        setTimeout(locationHome, 500);
        return;
      }
    }
    if (emailLogInput.value == "" || passwordLogInput.value == "") {
      messageAllInputs.classList.replace("d-none", "d-block");
      incorrect.classList.replace("d-block", "d-none");
      return;
    } else {
      messageAllInputs.classList.replace("d-block", "d-none");
      incorrect.classList.replace("d-none", "d-block");
      return;
    }
  });
}

// ================Home====================

if ( heroWrapper && localStorage.getItem('name')==null  ) {
  window.location.replace('./index.html');
}
if (heroWrapper) {
  nameHome.appendChild(text);
  nameHome.style.cssText = `color: var(--main-color);`;
  heroWrapper.appendChild(nameHome);
}
if (logOut) {
  logOut.addEventListener('click',function (eventinfo) {
    localStorage.removeItem('name');
    window.location.replace('./index.html');
  }  )
}

// ========================================
function clearForm() {
  userNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  userNameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-valid");
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (eventinfo) {
    validateForm(this);
    messageAllInputs.classList.replace("d-block", "d-none");
    messageEmail.classList.replace("d-block", "d-none");
    messageSucess.classList.replace("d-block", "d-none");
  });
}

function validateForm(element) {
  var regex = {
    userNameInput: /^[\w\s-]{3,15}$/,
    emailInput: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    passwordInput: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.nextElementSibling.classList.replace("d-none", "d-block");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    return false;
  }
}

function locationLogin() {
  window.location.href = "./index.html";
}

function locationHome() {
  window.location.href = "./home.html";
}


