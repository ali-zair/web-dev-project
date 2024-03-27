import * as Login from './login.js';

document.querySelector('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("executed");
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    if (Login.customerLogin(username, password)) {
        console.log("inside");
        alert("LOGGED IN!");
    } else {
        console.log("outside");
        alert("ERROR: COULD NOT LOG YOU IN!");
    }
});