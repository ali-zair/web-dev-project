import sellersFunc from "./functionalities/sellers-func.js";

window.addEventListener("load", async () => {
	showItems();
	window.handleBuyNow = handleBuyNow;
	window.handleShowDetails = handleShowDetails;
});

const loginBtn = document.querySelector("#loginBtn");
const searchBox = document.querySelector("#searchBox");
const main = document.querySelector("#main");

let filteredItems = [];
let items = [];

// check if the user is logged in using the login cookie stored in the local storage
if (await sellersFunc.isLoggedIn(localStorage.sellerCookie)) {
	loginBtn.textContent = "Logout";
	document.querySelector("#stats").classList.toggle("hidden", false);
} else {
	window.location.href = "/home.html"
}

// if the user is not logged in, set the login cookie to -1
localStorage.sellerCookie = localStorage.sellerCookie || "-1";

loginBtn.addEventListener("click", async () => {
	// if user is logging in
	if (loginBtn.textContent === "Login") {
		if (!(await sellersFunc.isLoggedIn(localStorage.sellerCookie))) {
			window.location.href = "/login-type.html";
		} else {
			loginBtn.textContent = "Login";
			document.querySelector("#stats").classList.toggle("hidden", true);
		}
	}
	// if user is logging out
	else {
		sellersFunc.logout(localStorage.sellerCookie);
		alert("You have successfully logged out");
		loginBtn.textContent = "Login";
		document.querySelector("#stats").classList.toggle("hidden", true);
		window.location.href = "/home.html"
	}
});

searchBox.addEventListener("input", find);

function find() {
	if (searchBox.value !== "") {
		filteredItems = items.filter((item) =>
			item.title.toLowerCase().includes(searchBox.value.toLowerCase())
		);
		showItems(true);
	} else {
		showItems(false);
	}
}

async function showItems(isFiltered) {
	try {
		const sellerId = localStorage.sellerCookie.split(":")[0]
		const items = await sellersFunc.getSellerItems(sellerId)
		console.log(items);
		if (isFiltered === true) {
			main.innerHTML = filteredItems.map((item) => itemToHTML(item)).join("");
		} else {
			main.innerHTML = items.map((item) => itemToHTML(item)).join("");
		}
	} catch (error) {
		console.error("Failed to load items:", error);
	}
}

function itemToHTML(item) {
	return `<section class="item">
					<figure>
							<img src="${item.thumbnail}" alt="Image of ${item.title} Laptop">
					</figure>
					<p>${item.title}</p>
					<p class="best-for">${item.note}</p>
					<p class="note">Notable Features: </p>
					<p class="features">${item.features[0]}</p>
					<p class="features">${item.features[1]}</p>
					<p class="features">${item.features[2]}</p>
					<p class="features">${item.features[3]}</p>
					<p class="price">$${item.price}</p>
					<button onclick="handleShowDetails(${item.id})">Show Details</button>
					<button onclick="handleBuyNow(${item.id})">Buy Now!</button>
			</section>`;
}

function handleShowDetails(id) {
	const item = items.find((item) => item.id === id);
	localStorage.itemID = item.id;
	window.location.href = "/show-details.html";
}

function handleBuyNow(id) {
	const item = items.find((item) => item.id === id);
	if (sellersFunc.isLoggedIn(localStorage.sellerCookie)) {
		localStorage.itemID = item.id;
		window.location.href = `/buy-now.html`;
	} else {
		alert("Please login as a customer to buy items!");
		window.location.href = "/login-type.html";
	}
}
