const scriptURL = 'https://script.google.com/macros/s/AKfycbwmsh2mxs_f7xz_vTHscRuvkVWzJEuLyHfL16Ts7dy-cQVNVO28WNKUuJx-G6d5BM8/exec';
let form = document.forms['submit-to-google-sheet'];

let loadImgCon = document.getElementsByClassName("loadImgCon")[0];

let nameError = document.getElementById("name-error");
let phoneError = document.getElementById("phone-error");
let nationalError = document.getElementById("national-error");
let EmailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");
let submitted = document.getElementById("submitted");
let submitImg = document.getElementById("submitImg");

form = document.getElementsByClassName("form")[0];
let fullName = document.getElementById("fullName");
let phone = document.getElementById("phone");
let national = document.getElementById("national");
let email = document.getElementById("email");
let message = document.getElementById("message");

let submit = document.getElementsByClassName("submit")[0];

fullName.onkeyup = function () {
  let name = fullName.value;
  let validName = /^[\p{L}]+\s+[\p{L}]+$/u;

  if (name === "") {
    nameError.innerText = "Enter your name";
  } else if (!validName.test(name)) {
    nameError.innerText = "Enter your correct full name";
  } else {
    nameError.innerText = "";
  }
};

phone.onkeyup = function () {
  let phoneNumber = phone.value;
  let validPhone = /^\d{11}$/;

  if (phoneNumber === "") {
    phoneError.innerText = "Enter your phone number";
  } else if (!validPhone.test(phoneNumber)) {
    phoneError.innerText = "Enter your correct phone number";
  } else {
    phoneError.innerText = "";
  }
};

national.onkeyup = function () {
  let nationalNumber = national.value;
  let validNational = /^\d{14}$/;

  if (nationalNumber === "") {
    nationalError.innerText = "Enter your national ID";
  } else if (!validNational.test(nationalNumber)) {
    nationalError.innerText = "Enter your correct national ID";
  } else {
    nationalError.innerText = "";
  }
};

email.onkeyup = function () {
  let emailVal = email.value;
  let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailVal === "") {
    EmailError.innerText = "Enter your email";
  } else if (!validEmail.test(emailVal)) {
    EmailError.innerText = "Enter your correct email";
  } else {
    EmailError.innerText = "";
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  let isValid = true;

  if (nameError.innerText.includes("Enter") || fullName.value === "") {
    nameError.innerText = "Enter your name";
    isValid = false;
  }

  if (phoneError.innerText.includes("Enter") || phone.value === "") {
    phoneError.innerText = "Enter your phone number";
    isValid = false;
  }

  if (nationalError.innerText.includes("Enter") || national.value === "") {
    nationalError.innerText = "Enter your national ID";
    isValid = false;
  }

  if (EmailError.innerText.includes("Enter") || email.value === "") {
    EmailError.innerText = "Enter your email";
    isValid = false;
  }

  if (message.value === "") {
    messageError.innerText = "Enter your message";
    isValid = false;
  }

  form.style.display = "none";

  function er_ror() {
    submitError.innerHTML = `
      <img class="submitImg" src="https://www.svgrepo.com/show/157825/error.svg" />
      <h1 id="submitted">Connection failed, try again!</h1>
      <button class="closeBtn">Reset</button>`;
    submitError.style.display = "flex";
    submitError.style.boxShadow = "0 0 20px 9px rgb(255 0 28 / 70%)";

    let closeBtn = document.getElementsByClassName("closeBtn")[0];
    closeBtn.onclick = resetForm;
  }

  if (isValid) {
    phone.value = "\'" + phone.value;
    console.log(phone.value);
    loadImgCon.style.display = "flex";
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        submitError.style.display = "flex";
        form.style.display = "none";
        submitted.innerText = `Thanks, ${fullName.value}! Your message is submitted`;
      })
      .catch(er_ror);
  }
});

function resetForm() {
  submitError.style.display = "none";

  fullName.value = "";
  phone.value = "";
  national.value = "";
  email.value = "";
  message.value = "";

  nameError.innerText = "";
  phoneError.innerText = "";
  nationalError.innerText = "";
  EmailError.innerText = "";
  messageError.innerText = "";

  loadImgCon.style.display = "none";
  form.style.display = "flex";
}

// Handle the close button click in case form is reset without using the submit function
document.querySelector('.closeBtn').addEventListener('click', resetForm);
