import customersFunc from "./functionalities/customers-func.js";

document.querySelector("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const cookie = await customersFunc.login(username, password);
  if (cookie) {
    localStorage.setItem('loginCookie', cookie)
    alert("Logged in successfully");
    window.location.href = "/home.html";
  } else {
    alert("Invalid username or password");
  }
});
