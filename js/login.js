const data = await fetch("js/data/users.json");
const users = await data.json();

console.log(users);

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  console.log(user);
  if (user) {
    localStorage.setItem('loggedInUser', user.uid);
    confirm("Successfully Logged In!");
    window.location.href = "/home.html";
  } else {
    confirm("Login Failed: Please try again");
  }
});
