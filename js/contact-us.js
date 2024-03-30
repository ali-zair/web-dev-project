const loginBtn = document.querySelector("#loginBtn");
const data = await fetch("js/data/users.json");
const users = await data.json();
const form = document.querySelector("form");

if (
  users.some(
    (user) => user.uid === parseInt(localStorage.getItem("loggedInUser"))
  )
) {
  loginBtn.textContent = "Logout";
  document.querySelector("#purchaseLI").classList.toggle("hidden", false);
}

loginBtn.addEventListener("click", () => {
  if (parseInt(localStorage.getItem("loggedInUser")) === -1) {
    window.location.href = "/login-type.html";
  } else {
    localStorage.setItem("loggedInUser", -1);
    loginBtn.textContent = "Login";
    document.querySelector("#purchaseLI").classList.toggle("hidden", true);
  }
});
document.querySelector(".form-group").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#username").value;
  const phone_number = document.querySelector("#password").value;
  const u = users.find(
    (user) => user.username === username && user.password === password
  );
  console.log(user);
  if (user) {
    localStorage.setItem("loggedInUser", user.uid);
    confirm("Successfully Logged In!");
    window.location.href = "/home.html";
  } else {
    confirm("Login Failed: Please try again");
  }
});
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.querySelector("#name").value;
  const phone = form.querySelector("#phone_number").value;
  const email = form.querySelector("#email").value;
  const message = form.querySelector("#message").value;

  const record = {
    name: name,
    phone: phone,
    email: email,
    message: message,
  };
  let records = localStorage.getItem("records");
  records = records ? JSON.parse(records) : [];
  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));

  form.reset();

  alert("Thank you for your feedback!");
});
