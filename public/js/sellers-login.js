import sellersFunc from "./functionalities/sellers-func.js";

document.querySelector("#loginForm").addEventListener("submit", async (event) => {
	event.preventDefault();
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	const cookie = await sellersFunc.login(username, password);
	if (cookie) {
		localStorage.sellerCookie = cookie;
		localStorage.custCookie = "-1";
		alert("Logged in successfully");
		window.location.href = "/add-item.html";
	} else {
		alert("Invalid username or password");
	}
});