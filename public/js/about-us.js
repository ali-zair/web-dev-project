import customersFunc from "./functionalities/customers-func.js";

const loginBtn = document.querySelector("#loginBtn");

window.addEventListener("load", async () => {
    console.log("checking now");
    if (await customersFunc.isLoggedIn(localStorage.loginCookie)) {
        console.log("inside the if");
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