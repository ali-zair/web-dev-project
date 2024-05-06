const loginBtn = document.querySelector("#loginBtn");
// const data = await fetch("js/data/users.json");
// const users = await data.json();

// if (users.some(user => user.uid === parseInt(localStorage.getItem('loggedInUser')))) {
//     loginBtn.textContent = "Logout";
//     document.querySelector("#purchaseLI").classList.toggle("hidden", false);
// }

loginBtn.addEventListener("click", () => {
    if (parseInt(localStorage.getItem('loggedInUser')) === -1) {
    window.location.href = "/login-type.html";
    } else {
    localStorage.setItem("loggedInUser", -1);
    loginBtn.textContent = "Login";
    document.querySelector("#purchaseLI").classList.toggle("hidden", true);
    }
});