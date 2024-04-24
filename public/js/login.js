import customersRepo from "./repo/customers-repo.js";

const data = await fetch("");
const users = await data.json();

console.log(users);

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const cookie = customersRepo.login(username, password);
  if (cookie) {
    localStorage.cookie = cookie
    alert("Logged in successfully");
    window.location.href = "/home.html";
  } else {
    alert("Invalid username or password");
  }
});
