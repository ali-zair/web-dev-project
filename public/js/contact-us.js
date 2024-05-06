import customersFunc from "./functionalities/customers-func.js";

const loginBtn = document.querySelector("#loginBtn");
// const data = await fetch("/api/customers");
// const users = await data.json();
const form = document.querySelector("form");

window.addEventListener("load", async () => {
  if (await customersFunc.isLoggedIn(localStorage.loginCookie)) {
    loginBtn.textContent = "Logout";
    document.querySelector("#purchaseLI").classList.toggle("hidden", false);
  }
});

loginBtn.addEventListener("click", async () => {
  if (loginBtn.textContent === "Login") {
    if (!(await customersFunc.isLoggedIn(localStorage.loginCookie))) {
      window.location.href = "/login-type.html";
    } else {
      loginBtn.textContent = "Login";
      document.querySelector("#purchaseLI").classList.toggle("hidden", true);
    }
  } else {
    customersFunc.logout(localStorage.loginCookie);
    loginBtn.textContent = "Login";
    document.querySelector("#purchaseLI").classList.toggle("hidden", true);
  }
});

// document.querySelector(".form-group").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const name = document.querySelector("#username").value;
//   const phone_number = document.querySelector("#password").value;
//   const u = users.find(
//     (user) => user.username === username && user.password === password
//   );
//   console.log(user);
//   if (user) {
//     localStorage.setItem("loggedInUser", user.uid);
//     alert("Successfully Logged In!");
//     window.location.href = "/home.html";
//   } else {
//     alert("Login Failed: Please try again");
//   }
// });

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const name = form.querySelector("#name").value;
//   const phone = form.querySelector("#phone_number").value;
//   const email = form.querySelector("#email").value;
//   const message = form.querySelector("#message").value;

//   const record = {
//     name: name,
//     phone: phone,
//     email: email,
//     message: message,
//   };
//   let records = localStorage.getItem("records");
//   records = records ? JSON.parse(records) : [];
//   records.push(record);
//   localStorage.setItem("records", JSON.stringify(records));

//   form.reset();

//   alert("Thank you for your feedback!");
// });
